const fs = require('fs-extra');
const handlebars = require('handlebars');
const { resolve } = require('path');

const getTplFilePath = (meta) => ({
  // docs 目录
  readme: {
    from: './.template/docs/README.md.tpl',
    to: `../../packages/components/${meta.compName}/docs/README.md`,
  },
  demo: {
    from: './.template/docs/demo.vue.tpl',
    to: `../../packages/components/${meta.compName}/docs/demo.vue`,
  },
  // src 目录
  vue: {
    from: './.template/src/index.vue.tpl',
    to: `../../packages/components/${meta.compName}/src/${meta.compName}.vue`,
  },
  vuets: {
    from: './.template/src/index.ts.tpl',
    to: `../../packages/components/${meta.compName}/src/${meta.compName}.ts`,
  },
  vueless: {
    from: './.template/src/index.less.tpl',
    to: `../../packages/theme/${meta.compName}.less`,
  },
  // 根目录
  install: {
    from: './.template/index.ts.tpl',
    to: `../../packages/components/${meta.compName}/index.ts`,
  },
});

// 生成模板文件
const compFilesTplReplacer = (meta) => {
  const filePaths = getTplFilePath(meta);
  Object.keys(filePaths).forEach((key) => {
    const fileTpl = fs.readFileSync(resolve(__dirname, filePaths[key].from), 'utf-8');
    const fileContent = handlebars.compile(fileTpl)(meta);
    fs.outputFile(resolve(__dirname, filePaths[key].to), fileContent, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
};

// 读取 packages/components/list.json 并更新
const listJsonTplReplacer = (meta) => {
  const listFilePath = '../../packages/components/list.json';
  const listFileTpl = fs.readFileSync(resolve(__dirname, listFilePath), 'utf-8');
  const listFileContent = JSON.parse(listFileTpl);
  if (!meta) {
    return listFileContent;
  }
  listFileContent.push(meta);
  const newListFileContentFile = JSON.stringify(listFileContent, null, 2);
  fs.writeFile(resolve(__dirname, listFilePath), newListFileContentFile, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return listFileContent;
};

// 更新 router.ts
const routerTplReplacer = (listFileContent) => {
  const routerFileFrom = './.template/router.ts.tpl';
  const routerFileTo = '../../src/router/componentRoutes.ts';
  const routerFileTpl = fs.readFileSync(resolve(__dirname, routerFileFrom), 'utf-8');
  const routes = listFileContent.filter((i) => i.compDoc); // 仅输出需要输出文档的路由
  const routerMeta = {
    routes: routes.map((comp) => {
      return `{
        name: 'Component${comp.compName}',
        path: '/components/${comp.compName}',
        component: () => import('@fzui/components/${comp.compName}/docs/README.md'),
        meta: {
          title: '${comp.compZhName}',
        }
      }`;
    }),
  };
  const routerFileContent = handlebars.compile(routerFileTpl, {
    noEscape: true,
  })(routerMeta);
  fs.outputFile(resolve(__dirname, routerFileTo), routerFileContent, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// 更新 install.ts
const installTsTplReplacer = (listFileContent) => {
  const installFileFrom = './.template/install.ts.tpl';
  const installFileTo = '../../packages/components/index.ts'; // 这里没有写错，别慌
  const installFileTpl = fs.readFileSync(resolve(__dirname, installFileFrom), 'utf-8');
  const installMeta = {
    importPlugins: listFileContent.map(({ compName }) => `import { ${compName}Plugin } from './${compName}';`).join('\n'),
    installPlugins: listFileContent.map(({ compName }) => `${compName}Plugin.install?.(app);`).join('\n    '),
    exportPlugins: listFileContent.map(({ compName }) => `export * from './${compName}';`).join('\n'),
  };
  const installFileContent = handlebars.compile(installFileTpl, {
    noEscape: true,
  })(installMeta);
  fs.outputFile(resolve(__dirname, installFileTo), installFileContent, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// 更新 style.less
const styleLessTplReplacer = (listFileContent) => {
  const styleFileFrom = './.template/style.less.tpl';
  const styleFileTo = '../../packages/theme/index.less'; // 这里没有写错，别慌
  const styleFileTpl = fs.readFileSync(resolve(__dirname, styleFileFrom), 'utf-8');
  const styleMeta = {
    exportComStyles: listFileContent.map(({ compName }) => `@import './${compName}.less';`).join('\n'),
  };
  const styleFileContent = handlebars.compile(styleFileTpl, {
    noEscape: true,
  })(styleMeta);
  fs.outputFile(resolve(__dirname, styleFileTo), styleFileContent, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = (meta) => {
  if (meta) {
    compFilesTplReplacer(meta);
  }
  const listFileContent = listJsonTplReplacer(meta);
  routerTplReplacer(listFileContent);
  installTsTplReplacer(listFileContent);
  styleLessTplReplacer(listFileContent);
  if (meta) {
    console.log(`✨ 组件新建完毕，请前往 packages/components/${meta.compName} 目录进行开发`);
  } else {
    console.log('🎉 组件重新生成完毕');
  }
};
