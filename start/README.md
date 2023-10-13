# Start

中文 | [英文](https://github.com/fangzhioo/fz-design/blob/master/start/README.en-US.md)

## 说明

开发目录，在这里测试你的组件

`App.vue` 中可以随意编写测试代码，原有代码可以随意删除、修改

## 开发阶段

在 `main.ts` 中，通过下面方式可以直接引入 `fz-design/packages` 下开发好的组件

```ts
import FzDesign from 'fz-design'
import '@fz-design/fz-design-theme'
```

## 打包阶段

如果你执行了 `pnpm build` 之后，想要测试你的打包文件是否可以正常工作，那么可以通过下面方式引入 `dist` 目录下的组件进行测试

```ts
import FzDesign from '../../dist'
import '@fz-design/fz-design-theme'
```
