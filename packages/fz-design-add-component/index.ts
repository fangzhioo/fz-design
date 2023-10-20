import { paramCase, pascalCase } from 'change-case'
import path from 'path'
import fsExtra from 'fs-extra'
import ejs from 'ejs';
import glob from 'glob';

// ====== https://github.com/gjtorikian/isBinaryFile/blob/main/src/index.ts =====
import * as fs from 'fs';
import { promisify } from 'util';

const statAsync = promisify(fs.stat);
const openAsync = promisify(fs.open);
const closeAsync = promisify(fs.close);

const MAX_BYTES: number = 512;

// A very basic non-exception raising reader. Read bytes and
// at the end use hasError() to check whether this worked.
class Reader {
  public fileBuffer: Buffer;
  public size: number;
  public offset: number;
  public error: boolean;

  constructor(fileBuffer: Buffer, size: number) {
    this.fileBuffer = fileBuffer;
    this.size = size;
    this.offset = 0;
    this.error = false;
  }

  public hasError(): boolean {
    return this.error;
  }

  public nextByte(): number {
    if (this.offset === this.size || this.hasError()) {
      this.error = true;
      return 0xff;
    }
    return this.fileBuffer[this.offset++];
  }

  public next(len: number): number[] {
    const n = new Array();
    for (let i = 0; i < len; i++) {
      n[i] = this.nextByte();
    }
    return n;
  }
}

// Read a Google Protobuf var(iable)int from the buffer.
function readProtoVarInt(reader: Reader): number {
  let idx = 0;
  let varInt = 0;

  while (!reader.hasError()) {
    const b = reader.nextByte();
    varInt = varInt | ((b & 0x7f) << (7 * idx));
    if ((b & 0x80) === 0) {
      break;
    }
    idx++;
  }

  return varInt;
}

// Attempt to taste a full Google Protobuf message.
function readProtoMessage(reader: Reader): boolean {
  const varInt = readProtoVarInt(reader);
  const wireType = varInt & 0x7;

  switch (wireType) {
    case 0:
      readProtoVarInt(reader);
      return true;
    case 1:
      reader.next(8);
      return true;
    case 2:
      const len = readProtoVarInt(reader);
      reader.next(len);
      return true;
    case 5:
      reader.next(4);
      return true;
  }
  return false;
}

// Check whether this seems to be a valid protobuf file.
function isBinaryProto(fileBuffer: Buffer, totalBytes: number): boolean {
  const reader = new Reader(fileBuffer, totalBytes);
  let numMessages = 0;

  while (true) {
    // Definitely not a valid protobuf
    if (!readProtoMessage(reader) && !reader.hasError()) {
      return false;
    }
    // Short read?
    if (reader.hasError()) {
      break;
    }
    numMessages++;
  }

  return numMessages > 0;
}

export async function isBinaryFile(file: string | Buffer, size?: number): Promise<boolean> {
  if (isString(file)) {
    const stat = await statAsync(file);

    isStatFile(stat);

    const fileDescriptor = await openAsync(file, 'r');

    const allocBuffer = Buffer.alloc(MAX_BYTES);

    // Read the file with no encoding for raw buffer access.
    // NB: something is severely wrong with promisify, had to construct my own Promise
    return new Promise((fulfill, reject) => {
      fs.read(fileDescriptor, allocBuffer, 0, MAX_BYTES, 0, (err, bytesRead, _) => {
        closeAsync(fileDescriptor);
        if (err) {
          reject(err);
        } else {
          fulfill(isBinaryCheck(allocBuffer, bytesRead));
        }
      });
    });
  } else {
    if (size === undefined) {
      size = file.length;
    }
    return isBinaryCheck(file, size);
  }
}

export function isBinaryFileSync(file: string | Buffer, size?: number): boolean {
  if (isString(file)) {
    const stat = fs.statSync(file);

    isStatFile(stat);

    const fileDescriptor = fs.openSync(file, 'r');

    const allocBuffer = Buffer.alloc(MAX_BYTES);

    const bytesRead = fs.readSync(fileDescriptor, allocBuffer, 0, MAX_BYTES, 0);
    fs.closeSync(fileDescriptor);

    return isBinaryCheck(allocBuffer, bytesRead);
  } else {
    if (size === undefined) {
      size = file.length;
    }
    return isBinaryCheck(file, size);
  }
}

function isBinaryCheck(fileBuffer: Buffer, bytesRead: number): boolean {
  // empty file. no clue what it is.
  if (bytesRead === 0) {
    return false;
  }

  let suspiciousBytes = 0;
  const totalBytes = Math.min(bytesRead, MAX_BYTES);

  // UTF-8 BOM
  if (bytesRead >= 3 && fileBuffer[0] === 0xef && fileBuffer[1] === 0xbb && fileBuffer[2] === 0xbf) {
    return false;
  }

  // UTF-32 BOM
  if (
    bytesRead >= 4 &&
    fileBuffer[0] === 0x00 &&
    fileBuffer[1] === 0x00 &&
    fileBuffer[2] === 0xfe &&
    fileBuffer[3] === 0xff
  ) {
    return false;
  }

  // UTF-32 LE BOM
  if (
    bytesRead >= 4 &&
    fileBuffer[0] === 0xff &&
    fileBuffer[1] === 0xfe &&
    fileBuffer[2] === 0x00 &&
    fileBuffer[3] === 0x00
  ) {
    return false;
  }

  // GB BOM
  if (
    bytesRead >= 4 &&
    fileBuffer[0] === 0x84 &&
    fileBuffer[1] === 0x31 &&
    fileBuffer[2] === 0x95 &&
    fileBuffer[3] === 0x33
  ) {
    return false;
  }

  if (totalBytes >= 5 && fileBuffer.slice(0, 5).toString() === '%PDF-') {
    /* PDF. This is binary. */
    return true;
  }

  // UTF-16 BE BOM
  if (bytesRead >= 2 && fileBuffer[0] === 0xfe && fileBuffer[1] === 0xff) {
    return false;
  }

  // UTF-16 LE BOM
  if (bytesRead >= 2 && fileBuffer[0] === 0xff && fileBuffer[1] === 0xfe) {
    return false;
  }

  for (let i = 0; i < totalBytes; i++) {
    if (fileBuffer[i] === 0) {
      // NULL byte--it's binary!
      return true;
    } else if ((fileBuffer[i] < 7 || fileBuffer[i] > 14) && (fileBuffer[i] < 32 || fileBuffer[i] > 127)) {
      // UTF-8 detection
      if (fileBuffer[i] > 193 && fileBuffer[i] < 224 && i + 1 < totalBytes) {
        i++;
        if (fileBuffer[i] > 127 && fileBuffer[i] < 192) {
          continue;
        }
      } else if (fileBuffer[i] > 223 && fileBuffer[i] < 240 && i + 2 < totalBytes) {
        i++;
        if (fileBuffer[i] > 127 && fileBuffer[i] < 192 && fileBuffer[i + 1] > 127 && fileBuffer[i + 1] < 192) {
          i++;
          continue;
        }
      }

      suspiciousBytes++;
      // Read at least 32 fileBuffer before making a decision
      if (i >= 32 && (suspiciousBytes * 100) / totalBytes > 10) {
        return true;
      }
    }
  }

  if ((suspiciousBytes * 100) / totalBytes > 10) {
    return true;
  }

  if (suspiciousBytes > 1 && isBinaryProto(fileBuffer, totalBytes)) {
    return true;
  }

  return false;
}

function isString(x: any): x is string {
  return typeof x === 'string';
}

function isStatFile(stat: fs.Stats): void {
  if (!stat.isFile()) {
    throw new Error(`Path provided was not a file!`);
  }
}

// ======== end ============

function isDir(fd: string) {
  try {
    if (!fd || typeof fd !== 'string') {
      return false;
    }
    return fsExtra.statSync(fd).isDirectory();
  } catch (error) {
    return false;
  }
}

const logInfo = (...args: string[]): void =>
  console.info('\x1B[33m', ...args, '\x1B[0m')
const logError = (...args: string[]): void =>
  console.error('\x1B[31m', ...args, '\x1B[0m')

async function updateFileOrDirName(
  originalPath: string,
  data: ejs.Data | undefined,
  options: ejs.Options | undefined,
  optParseDest: boolean | Function | undefined
) {
  let dest;
  if (optParseDest === true) {
    dest = ejs.render(originalPath, data, options);
  } else if (optParseDest instanceof Function) {
    dest = optParseDest(originalPath);
  }

  if (originalPath !== dest) {
    logInfo('updateFileOrDirName: ', dest, ' from: ', originalPath);
    await fsExtra.move(originalPath, dest);
  }
}

function gerenateFileContent(
  outputPath: string,
  tplPath: string,
  data?: ejs.Data,
  options?: ejs.Options,
) {
  return ejs.renderFile(tplPath, data, options).then(content => {
    return fsExtra.writeFile(outputPath, content);
  });
}

const gerenateDir = (
  cwd: string,
  tplDir: string,
  data?: ejs.Data,
  options?: ejs.Options,
  customOpts?: { ignore?: string[]; parseFilename?: Function },
): Promise<void> => {
  const { ignore, parseFilename: optParseDest = false } = customOpts || {};

  cwd = path.resolve(cwd);
  tplDir = path.resolve(tplDir);

  return new Promise((resolve, reject) => {
    glob('**', { cwd: tplDir, ignore, dot: true }, function (err: any, _files: string[]) {
      if (err) {
        reject(err);
        return;
      }

      const parseSingle = async (relativeTplPath: string) => {
        const fullTplPath = path.resolve(tplDir, relativeTplPath);
        const isdir = isDir(fullTplPath);
        const outputPath = path.resolve(cwd, relativeTplPath);

        logInfo('outputPath: ', isdir ? 'dir' : 'file', outputPath, ' from: ', fullTplPath);

        if (isdir) {
          fsExtra.ensureDirSync(outputPath);
        } else {
          if (await isBinaryFile(fullTplPath)) return;

          fsExtra.ensureFileSync(outputPath);
          logInfo('gerenateFileContent: ', outputPath, ' from: ', fullTplPath);
          await gerenateFileContent(outputPath, fullTplPath, data, options);
        }

        if (optParseDest) {
          await updateFileOrDirName(outputPath, data, options, optParseDest);
        }
      };

      Promise.all(
        _files.map(parseSingle)
      ).then(() => resolve(), reject);
    });
  });
};

const updatedFiles: string[] = []
const compName: string = fetchCompName()
const displayName = `${pascalCase(compName)}`
const __dirname: string = path.resolve()
const outputDir: string = path.resolve(
  __dirname,
  '../fz-design/components',
  compName
)
const mainFilePath: string = path.join(
  'packages/fz-design/components',
  compName,
  `${compName}.vue`
)

const detectPublic = async (): Promise<void> => {
  /** 如果已经存在 */
  if (fsExtra.existsSync(outputDir)) {
    logError(`组件 ${compName}` + '\n' + `已存在${mainFilePath}`)
    return
  }

  try {
    await generate()
    logInfo(
      '本次创建/修改的文件有：' +
      '\n' +
      '\n' +
      `${updatedFiles.join('\n')}` +
      '\n'
    )
  } catch (error: unknown) {
    logError(`不好意思，组件[${compName}]创建失败了` + '\n' + `error: ${error}`)
    process.exit(0)
  }

  logInfo(`Fz${displayName} 组件创建完成 🎉🎉🎉` + '\n')
}

detectPublic()

/** 检测组件名是否规范 */
function fetchCompName(): string {
  const input: string = process.argv[2]

  if (input === undefined) {
    logError(
      '\n' +
      '命令使用方法为: pnpm new <component-name>' +
      '\n' +
      '例如: pnpm new user-avatar' +
      '\n'
    )
    process.exit(0)
  }

  if (
    input.match(/^[a-zA-Z]+?[-|_|a-zA-Z0-9]*?$/) &&
    !input.endsWith('-') &&
    !input.endsWith('_')
  ) {
    const compName: string = paramCase(input)
    return compName
  }

  logError('组件名不规范')
  process.exit(0)
}

async function generate(): Promise<[void, void, void, void, void, void, void]> {
  updatedFiles.push(
    `packages/fz-design/components/${compName}/**`,
    'packages/fz-design/components/index.ts',
    `packages/fz-design-theme/src/${compName}.scss`,
    'packages/fz-design-theme/index.scss',
    `packages/fz-design/components/${compName}/__test__/${compName}.spec.ts`,
    `docs/components/${compName}.md`,
    `docs/demos/${compName}/basic.vue`,
  )
  const catchError = async (
    callback: Function,
    info: string
  ): Promise<void> => {
    try {
      await callback()
    } catch (error: unknown) {
      logError(info + '\n' + `error: ${error}`)
    }
  }
  return Promise.all([
    catchError(generateComponentDir, '🚧 组件源文件创建失败'),
    catchError(updateComponentEntry, '🚧 组件入口修改失败'),
    catchError(incrementStyle, '🚧 样式文件创建失败'),
    catchError(updateStyleEntry, '🚧 样式入口修改失败'),
    catchError(incrementTest, '🚧 测试文件创建失败'),
    catchError(incrementDocs, '🚧 文档文件创建失败'),
    catchError(incrementDemos, '🚧 文档示例创建失败'),
  ] as const)
}

async function generateComponentDir(): Promise<void> {
  const tplDir: string = path.resolve(__dirname, './template/component')

  /** 编译文件内容 */
  await superEjsGerenateDir(outputDir, tplDir)
}

/** 修改组件入口文件 */
async function updateComponentEntry(): Promise<void> {
  const entryFilePath: string = path.resolve(
    __dirname,
    '../fz-design/components/index.ts'
  )
  let content: string = (await fsExtra.readFile(entryFilePath)).toString()

  content =
    content.slice(0, -1) +
    '\n' +
    '\n' +
    `export { Fz${displayName} } from './${compName}'` +
    '\n' +
    `export * from './${compName}'` +
    '\n'

  await fsExtra.writeFile(entryFilePath, content)
}

/** 创建样式文件 */
async function incrementStyle(): Promise<void> {
  const outputDir: string = path.resolve(__dirname, '../fz-design-theme/src')
  const tplDir: string = path.resolve(__dirname, './template/style')

  /** 编译文件内容 */
  await superEjsGerenateDir(outputDir, tplDir)
}

/** 添加样式入口 */
async function updateStyleEntry(): Promise<void> {
  const entryFilePath: string = path.resolve(
    __dirname,
    '../fz-design-theme/index.scss'
  )
  let content: string = (await fsExtra.readFile(entryFilePath)).toString()

  content = content.slice(0, -1) + '\n' + `@use './src/${compName}';` + '\n'

  await fsExtra.writeFile(entryFilePath, content)
}

/** 添加测试文件 */
async function incrementTest(): Promise<void> {
  const outputDir: string = path.resolve(
    __dirname,
    `../fz-design/components/${compName}/__test__`
  )
  const tplDir: string = path.resolve(__dirname, './template/test')
  await superEjsGerenateDir(outputDir, tplDir)
}

/** 添加组件文档文件 */
async function incrementDocs(): Promise<void> {
  const outputDir: string = path.resolve(
    __dirname,
    `../../docs/components`
  )
  const tplDir: string = path.resolve(__dirname, './template/docs')
  await superEjsGerenateDir(outputDir, tplDir)
}

/** 添加组件示例 */
async function incrementDemos(): Promise<void> {
  const outputDir: string = path.resolve(
    __dirname,
    `../../docs/demos/${compName}`
  )
  const tplDir: string = path.resolve(__dirname, './template/demos')
  await superEjsGerenateDir(outputDir, tplDir)
}

async function superEjsGerenateDir(
  outputDir: string,
  tplDir: string
): Promise<void> {
  return await gerenateDir(
    outputDir,
    tplDir,
    {
      name: compName,
      displayName
    },
    {},
    {
      parseFilename: (original: string): string => {
        return original.replace(
          /(.*?)__name__([a-zA-Z0-9|\.]*?$)/,
          `$1${compName}$2`
        )
      }
    }
  )
}
