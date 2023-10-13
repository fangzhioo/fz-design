/**
 * 将svg自动构建成vue组件
 */
const path = require('path')
const fs = require('fs')

const inputSvg = path.resolve(__dirname, '../../packages/fz-design-icon/feather')
const inputSrc = path.resolve(__dirname, '../../packages/fz-design-icon/src')

// 前缀
const prefix = 'icon-'

fs.readdirSync(inputSvg).forEach(name => {
  /** 创建文件夹 */
  fs.mkdirSync(`${inputSrc}/${prefix}${name.slice(0, name.length - 4)}`)

  /** 移动文件 */
  fs.copyFileSync(
    `${inputSvg}/${name}`,
    `${inputSrc}/${prefix}${name.slice(0, name.length - 4)}/index.vue`
  )
})

const inputSrcPath = [];

fs.readdirSync(inputSrc).forEach(name => {
    if(name === 'index.ts') {
        return;
    }
    inputSrcPath.push(name);
})

async function writeSrcFiles() {
    const svgPromise = inputSrcPath.map(name => new Promise((resolve, reject) => {
        /** 文件路径 */
      const newPath = `${inputSrc}/${name}/index.vue`
    
      /** 读取 */
      fs.readFile(newPath, (err, data) => {
        if(err) {
            reject(err)
            return;
        }
        if (data) {
          const svgContent = data.toString()
          // 去除自带的class属性
          const clearContent = svgContent.replace(/class="[\s\S]*?"/g, '')
          const content =
            '<template>' + '\n' + '  ' + clearContent + '\n' + '</template>' + '\n'
    
          /** 重新写入 */
          fs.writeFile(newPath, content, err => {
            if(err) {
                reject(err)
                return;
            }
            console.log(`${name} 成功 🎉`)
            resolve()
          })
          return;
        }
        reject(new Error(`${name} 不存在`))
      })
    }))

    return Promise.all(svgPromise);
}

writeSrcFiles();

inputSrcPath.forEach(name => {
  /** 文件路径 */
  const newPath = `${inputSrc}/${name}/index.vue`

  /** 读取 */
  fs.readFile(newPath, (err, data) => {
    if (data) {
      const svgContent = data.toString()
      // 去除自带的class属性
      const clearContent = svgContent.replace(/class="[\s\S]*?"/g, '')
      const content =
        '<template>' + '\n' + '  ' + clearContent + '\n' + '</template>' + '\n'

      /** 重新写入 */
      fs.writeFile(newPath, content, err => {
        !err && console.log(`${name} 成功 🎉`)
      })
    }
  })
})

function hyphenToCamelCase(inputString) {
    // 将字符串拆分成单词
    const words = inputString.split('-');
    
    // 大写驼峰命名，第一个单词的首字母也大写
    const camelCaseString = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  
    return camelCaseString;
  }

  
function updateExportFile() {
    const exportOutPath = `${inputSrc}/index.ts`;
    const contentItems = [];
    inputSrcPath.forEach((name) => {
        const displayName = hyphenToCamelCase(name);
        const exportItemStr = `\nexport { default as ${displayName} } from './${name}/index.vue'\n`;
        contentItems.push(exportItemStr);
    })
    const content = contentItems.join('');
    /** 重新写入 */
    fs.writeFile(exportOutPath, content, err => {
        !err && console.log(`更新 ${exportOutPath} 成功 🎉`)
    })
}

updateExportFile();

