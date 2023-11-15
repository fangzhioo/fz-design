# Scrollbar 滚动条

用于替换浏览器原生滚动条。

## 基本用法

通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。

::: demo

scrollbar/basic

:::

## 横向滚动

当元素宽度大于滚动条宽度时，会显示横向滚动条。

::: demo

scrollbar/horizontal

:::

## 最大高度

当元素高度超过最大高度，才会显示滚动条。

::: demo

scrollbar/max-height

:::

## 手动控制

通过使用 setScrollTop 与 setScrollLeft 方法，可以手动控制滚动条滚动。

::: demo

scrollbar/manual

:::

## API

### Attributes

| 参数             | 说明                                                                 | 类型                                                      | 默认值 |
| ---------------- | -------------------------------------------------------------------- | --------------------------------------------------------- | ------ |
| height           | 滚动条高度                                                           | `string` / `number`                                       | —      |
| max-height       | 滚动条最大高度                                                       | `string` / `number`                                       | —      |
| native           | 是否使用原生滚动条样式                                               | `boolean`                                                 | false  |
| wrap-style       | 包裹容器的自定义样式                                                 | `string` / `CSSProperties \| CSSProperties[] \| string[]` | —      |
| wrap-class       | 包裹容器的自定义类名                                                 | `string`                                                  | —      |
| view-style       | 视图的自定义样式                                                     | `string` / `CSSProperties \| CSSProperties[] \| string[]` | —      |
| view-class       | 视图的自定义类名                                                     | `string`                                                  | —      |
| noresize         | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 | `boolean`                                                 | false  |
| tag              | 视图的元素标签                                                       | `string`                                                  | div    |
| always           | 滚动条总是显示                                                       | `boolean`                                                 | false  |
| min-size         | 滚动条最小尺寸                                                       | `number`                                                  | 20     |
| id               | 视图 ID                                                              | `string`                                                  | —      |
| role             | 视图的角色                                                           | `string`                                                  | —      |
| aria-label       | 视图的 aria-label                                                    | `string`                                                  | —      |
| aria-orientation | 视图的 aria-orientation                                              | `'horizontal' \| 'vertical'`                              | —      |

### Slots

| 名称      | 说明     |
| --------- | -------- |
| `default` | 默认内容 |

### Events

| 事件名称 | 说明                       | 类型                                                  |
| -------- | -------------------------- | ----------------------------------------------------- |
| scroll   | 滑动时触发，返回滚动的距离 | `({ scrollLeft: number, scrollTop: number }) => void` |

### Exposes

| 名称          | 说明                   | 类型                                                            |
| ------------- | ---------------------- | --------------------------------------------------------------- |
| handleScroll  | 触发滚动事件           | `() => void`                                                    |
| scrollTo      | 滚动到一组特定坐标     | `(options: ScrollToOptions \| number, yCoord?: number) => void` |
| setScrollTop  | 设置滚动条到顶部的距离 | `(scrollTop: number) => void`                                   |
| setScrollLeft | 设置滚动条到左边的距离 | `(scrollLeft: number) => void`                                  |
| update        | 手动更新滚动条状态     | `() => void`                                                    |
| wrapRef       | 滚动条包裹的 ref 对象  | `Ref<HTMLDivElement>`                                           |
