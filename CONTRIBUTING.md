# CONTRIBUTING

中文 | [English](https://github.com/fangzhioo/fz-design/blob/master/CONTRIBUTING.en-US.md)

## 👋 写在前面

你好！欢迎使用 Fz Design！

我很高兴你有兴趣为 fz-design 做贡献。在提交您的贡献之前，请务必花点时间阅读以下指南。

规范可能比较多，但是大多数都是一些比较细小的规范，请认真阅读。

## 🛠️ 启动项目

在贡献之前，你需要先将 fz-design 项目跑起来才行，那么前期的准备你需要：

- 安装 [node](http://nodejs.cn)，版本 >= 16
- 安装 [pnpm](https://pnpm.io/zh)，最新版即可

如果你已经做好了前面的准备，可以直接跳过，从这里开始：

- Fork [fz-design](https://github.com/fangzhioo/fz-design)

接下来执行命令：

```shell
# clone 项目
git clone git@github.com:fangzhioo/fz-design.git

# 进入项目目录
cd fz-design

# 安装依赖项
pnpm i

# 启动开发项目
pnpm start

# 启动文档
pnpm dev:docs
```

## 🔍 开发工具

请先阅读 [IDE 支持](https://cn.vuejs.org/guide/typescript/overview.html#ide-support)

编辑器强烈推荐使用 [Visual Studio Code](https://code.visualstudio.com/)，内置插件请务必安装以下几款：

- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) Vue3 官方开发插件
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) 用于支持在 TS 中 import `*.vue` 文件
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 代码格式校验，如果不安装，那么 [fz-eslint-config](https://github.com/fangzhioo/fz-design/blob/master/packages/fz-eslint-config) 则不生效
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) 用于检测单词拼写错误

## 🔓 命令说明

fz-design 内部设置了很多的命令，在 [package.json](https://github.com/fangzhioo/fz-design/blob/master/package.json) 中可进行查看。下面详细介绍每一条命令：

| script 字段   | 对应命令           | 命令说明                                                                                                                                                                         |
| ------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clear`       | `pnpm clear`       | 清除 dist 打包目录                                                                                                                                                               |
| `start`       | `pnpm start`       | 启动测试开发项目                                                                                                                                                                 |
| `dev:docs`    | `pnpm dev:docs`    | 启动文档项目                                                                                                                                                                     |
| `build`       | `pnpm build`       | 命令集合。打包所有组件、样式、类型。打包出来的就是最终需要发布的包 执行配置文件 vite.config.ts                                                                                   |
| `build:css`   | `pnpm build:css`   | 分别打包组件的样式，执行配置文件 vite.config.css.ts                                                                                                                              |
| `build:theme` | `pnpm build:theme` | 打包完整的主题样式，执行配置文件 vite.config.theme.ts                                                                                                                            |
| `build:icon`  | `pnpm build:icon`  | 打包 fz-design-icon                                                                                                                                                              |
| `build:docs`  | `pnpm build:docs`  | 打包文档项目 docs                                                                                                                                                                |
| `build:start` | `pnpm build:start` | 打包 `start` 测试项目 start                                                                                                                                                      |
| `serve:docs`  | `pnpm serve:docs`  | 预览打包后的文档                                                                                                                                                                 |
| `new`         | `pnpm new xxx`     | 构建全新组件，生产组件所需要的文件，执行配置文件 [index.ts]，详情参考 [README.md](https://github.com/fangzhioo/fz-design/blob/master/packages/fz-design-add-component/README.md) |
| `test`        | `pnpm test`        | 执行单元测试                                                                                                                                                                     |
| `prettier`    | `pnpm prettier`    | 全局格式化                                                                                                                                                                       |
| `commit`      | `pnpm commit`      | commit 钩子                                                                                                                                                                      |
| `lint`        | `pnpm lint`        | 全局 eslint 检测，规则参考 [](https://github.com/fangzhioo/fz-design/blob/master/packages/fz-eslint-config/index.js)                                                             |
| `lint:fix`    | `pnpm lint:fix`    | 全局 eSLint 检测 + 修复                                                                                                                                                          |
| `changelog`   | `pnpm changelog`   | 同步文档的更新日志                                                                                                                                                               |
| `ver`         | `pnpm ver x.x.x`   | 设置新的版本号                                                                                                                                                                   |
| `format`      | `pnpm format`      | 全局格式化 + 修复                                                                                                                                                                |

## 🚧 开发规范

主要源文件都在 [packages](https://github.com/fangzhioo/fz-design/tree/master/packages) 目录下，其中每个子目录都有单独的 `README.md` 对指定目录进行说明，每个模块详细的规范参考下面文档：

**详细的规范在下面链接，千万不要忽略下面链接！！！**

**详细的规范在下面链接，千万不要忽略下面链接！！！**

**详细的规范在下面链接，千万不要忽略下面链接！！！**

- [fz-design-add-component](https://github.com/fangzhioo/fz-design/blob/master/packages/fz-design-add-component/README.md) 创建新组件
- [fz-design](https://github.com/fangzhioo/fz-design/blob/master/packages/fz-design/README.md) 组件源文件目录
- [fz-design-theme](https://github.com/fangzhioo/fz-design/blob/master/packages/fz-design-theme/README.md) 样式主题目录
- [fz-eslint-config](https://github.com/fangzhioo/fz-design/blob/master/packages/fz-eslint-config/README.md) Eslint 配置项
- [docs](https://github.com/fangzhioo/fz-design/blob/master/docs/README.md) 文档编写规范

## 🛸 提交规范

Git 允许我们在每次提交时，附带一个提交信息作为说明，当执行 `commit` 的时候，需要严格按照下方说明规范进行填写说明信息，提交信息必须是下面信息中的一个，后面跟随 `英文的冒号 + 空格 + 信息`

例如：

```shell
git commit -m 'feat: 新增 xxx 功能'
```

类型必须是下面类型之一，并对照类型描述填写。

| 类型       | 描述                                 |
| ---------- | ------------------------------------ |
| `build`    | 打包                                 |
| `chore`    | 改变构建流程或者增加依赖库、工具等   |
| `ci`       | CI 相关更改                          |
| `docs`     | 文档改变                             |
| `feat`     | 新功能                               |
| `fix`      | 修复                                 |
| `perf`     | 性能优化                             |
| `refactor` | 既不修复错误也不添加功能的代码更改   |
| `revert`   | 发布新版本                           |
| `style`    | 标记、空格、格式、缺少分号           |
| `test`     | 增加测试/测试用例                    |

但 fz-design 内置了 [commitlint](https://github.com/conventional-changelog/commitlint) 插件可以辅助我们进行添加提交信息，那么就需要执行下面命令：

```shell
git add .

# 使用插件的提示来设置提交信息
pnpm commit

git push
```

## ✏️ 关于 PR

在你提交 `PR` 之前，请务必保证你 `fork` 的仓库是当前最新的代码，以免发生冲突。

## 🔑 财务贡献

觉得不错，可以赞赏一杯奶茶🥤！

## 💌 非常感谢

感谢所有已经为 fz-design [做出贡献的人](https://github.com/fangzhioo/fz-design/graphs/contributors)！

<a href="https://github.com/fangzhioo/fz-design/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fangzhioo/fz-design" />
</a>
