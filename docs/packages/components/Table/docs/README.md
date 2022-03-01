<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import demo4 from './demo4.vue'
import demo5 from './demo5.vue'
import demo6 from './demo6.vue'
import demo7 from './demo7.vue'
import demo8 from './demo8.vue'
import demo9 from './demo9.vue'
import demo10 from './demo10.vue'
import demo11 from './demo11.vue'
import demo12 from './demo12.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 表格

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。

## 基础用法

<Preview comp-name="Table" demo-name="demo">
  <demo />
</Preview>

## 固定表头

纵向内容过多时，可选择固定表头。只要在 `fz-table` 元素中定义了 `height` 属性，即可实现固定表头的表格，而不需要额外的代码。

<Preview comp-name="Table" demo-name="demo2">
  <demo2 />
</Preview>

## 固定列

横向内容过多时，可选择固定列。固定列需要使用 `fixed` 属性，它接受 `Boolean` 值 如果为 `true`, 列将被左侧固定. 它还接受传入字符串，`left` 或 `right`，表示左边固定还是右边固定。

<Preview comp-name="Table" demo-name="demo3">
  <demo3 />
</Preview>

## 流体高度

当数据量动态变化时，可以为 Table 设置一个最大高度。通过设置 `max-height` 属性为 Table 指定最大高度。 此时若表格所需的高度大于最大高度，则会显示一个滚动条。

<Preview comp-name="Table" demo-name="demo4">
  <demo4 />
</Preview>

## 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。只需要在 `fz-table-column` 里面嵌套 `fz-table-column`，就可以实现多级表头。

<Preview comp-name="Table" demo-name="demo5">
  <demo5 />
</Preview>

## 单选/多选

选择单行数据时使用色块表示。

Table 组件提供了单选的支持， 只需要配置 `highlight-current-row` 属性即可实现单选。 之后由 `current-change` 事件来管理选中时触发的事件，它会传入 `currentRow`，`oldCurrentRow`。 如果需要显示索引，可以增加一列 `fz-table-column`，设置 `type` 属性为 `index` 即可显示从 1 开始的索引号。

你也可以选择多行。

实现多选非常简单: 手动添加一个 `fz-table-column`，设 type 属性为 `selection` 即可； 除了多个选项，此示例还使用 `show-overflow-tooltip`：默认， 如果内容过长，它会分成多行。 若需要单行显示可以使用 `show-overflow-tooltip` 属性，它接受一个 Boolean， 为 true 时多余的内容会在 hover 时以 `tooltip` 的形式显示出来。

<Preview comp-name="Table" demo-name="demo6">
  <demo6 />
</Preview>

## 排序

对表格进行排序，可快速查找或对比数据。

在列中设置 `sortable` 属性即可实现以该列为基准的排序， 接受一个 `Boolean`，默认为 `false`。 可以通过 Table 的 `default-sort` 属性设置默认的排序列和排序顺序。 可以使用 `sort-method` 或者 `sort-by` 使用自定义的排序规则。 如果需要后端排序，需将 `sortable` 设置为 `custom`，同时在 Table 上监听 `sort-change` 事件， 在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。 在本例中，我们还使用了 `formatter` 属性，它用于格式化指定列的值， 接受一个 `Function`，会传入两个参数：`row` 和 `column`， 可以根据自己的需求进行处理。

<Preview comp-name="Table" demo-name="demo7">
  <demo7 />
</Preview>

## 筛选

对表格进行筛选，可快速查找到自己想看的数据。

在列中设置 `filters` 和 f`ilter-method`属性即可开启该列的筛选， filters 是一个数组，`filter-method` 是一个方法，它用于决定某些数据是否显示， 会传入三个参数：`value`, `row` 和 `column`。

<Preview comp-name="Table" demo-name="demo8">
  <demo8 />
</Preview>

## 自定义列模板

自定义列的显示内容，可组合其他组件使用。通过 `slot` 可以获取到 `row`, `column`, `$index` 和 `store`（table 内部的状态管理）的数据。

<Preview comp-name="Table" demo-name="demo9">
  <demo9 />
</Preview>

## 展开行

当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。通过设置 `type="expand"` 和 `slot` 可以开启展开行功能， `fz-table-column` 的模板会被渲染成为展开行的内容，展开行可访问的属性与使用自定义列模板时的 `slot` 相同。

<Preview comp-name="Table" demo-name="demo10">
  <demo10 />
</Preview>

## 树形数据与懒加载

支持树类型的数据的显示。 当 `row` 中包含 `children` 字段时，被视为树形数据。 渲染树形数据时，必须要指定 `row-key`。支持子节点数据异步加载。 设置 Table 的`lazy`属性为 `true` 与加载函数 `load` 。 通过指定 `row` 中的`hasChildren`字段来指定哪些行是包含子节点。 `children` 与 `hasChildren` 都可以通过 `tree-props` 配置。

<Preview comp-name="Table" demo-name="demo11">
  <demo11 />
</Preview>

## 合并行或列

多行或多列共用一个数据时，可以合并行或列。

通过给 table 传入`span-method`方法可以实现合并行或列， 方法的参数是一个对象，里面包含当前行 `row`、当前列 `column`、当前行号 `rowIndex`、当前列号 `columnIndex` 四个属性。 该函数可以返回一个包含两个元素的数组，第一个元素代表 `rowspan`，第二个元素代表 `colspan`。 也可以返回一个键名为 `rowspan` 和 `colspan` 的对象。

<Preview comp-name="Table" demo-name="demo12">
  <demo12 />
</Preview>

## Table 属性

| Attribute               | Description                                                                                                                                                                                                                                                                 | Type                                                        | Accepted Values                 | Default                                                                        |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------ |
| data                    | Table data                                                                                                                                                                                                                                                                  | array                                                       | —                               | —                                                                              |
| height                  | Table's height. By default it has an `auto` height. If its value is a number, the height is measured in pixels; if its value is a string, the value will be assigned to element's style.height, the height is affected by external styles                                   | string / number                                             | —                               | —                                                                              |
| max-height              | Table's max-height. The legal value is a number or the height in px.                                                                                                                                                                                                        | string / number                                             | —                               | —                                                                              |
| stripe                  | whether Table is striped                                                                                                                                                                                                                                                    | boolean                                                     | —                               | false                                                                          |
| border                  | whether Table has vertical border                                                                                                                                                                                                                                           | boolean                                                     | —                               | false                                                                          |
| size                    | size of Table                                                                                                                                                                                                                                                               | string                                                      | large / default /small          | —                                                                              |
| fit                     | whether width of column automatically fits its container                                                                                                                                                                                                                    | boolean                                                     | —                               | true                                                                           |
| show-header             | whether Table header is visible                                                                                                                                                                                                                                             | boolean                                                     | —                               | true                                                                           |
| highlight-current-row   | whether current row is highlighted                                                                                                                                                                                                                                          | boolean                                                     | —                               | false                                                                          |
| current-row-key         | key of current row, a set only prop                                                                                                                                                                                                                                         | string / number                                             | —                               | —                                                                              |
| row-class-name          | function that returns custom class names for a row, or a string assigning class names for every row                                                                                                                                                                         | function(\{ row, rowIndex \}) / string                      | —                               | —                                                                              |
| row-style               | function that returns custom style for a row, or an object assigning custom style for every row                                                                                                                                                                             | function(\{ row, rowIndex \}) / object                      | —                               | —                                                                              |
| cell-class-name         | function that returns custom class names for a cell, or a string assigning class names for every cell                                                                                                                                                                       | function(\{ row, column, rowIndex, columnIndex \}) / string | —                               | —                                                                              |
| cell-style              | function that returns custom style for a cell, or an object assigning custom style for every cell                                                                                                                                                                           | function(\{ row, column, rowIndex, columnIndex \}) / object | —                               | —                                                                              |
| header-row-class-name   | function that returns custom class names for a row in table header, or a string assigning class names for every row in table header                                                                                                                                         | function(\{ row, rowIndex }\) / string                      | —                               | —                                                                              |
| header-row-style        | function that returns custom style for a row in table header, or an object assigning custom style for every row in table header                                                                                                                                             | function(\{ row, rowIndex \}) / object                      | —                               | —                                                                              |
| header-cell-class-name  | function that returns custom class names for a cell in table header, or a string assigning class names for every cell in table header                                                                                                                                       | function(\{ row, column, rowIndex, columnIndex \}) / string | —                               | —                                                                              |
| header-cell-style       | function that returns custom style for a cell in table header, or an object assigning custom style for every cell in table header                                                                                                                                           | function(\{ row, column, rowIndex, columnIndex \}) / object | —                               | —                                                                              |
| row-key                 | key of row data, used for optimizing rendering. Required if `reserve-selection` is on or display tree data. When its type is String, multi-level access is supported, e.g. `user.info.id`, but `user.info[0].id` is not supported, in which case `Function` should be used. | function(row) / string                                      | —                               | —                                                                              |
| empty-text              | Displayed text when data is empty. You can customize this area with `#empty`                                                                                                                                                                                                | string                                                      | —                               | No Data                                                                        |
| default-expand-all      | whether expand all rows by default, works when the table has a column type="expand" or contains tree structure data                                                                                                                                                         | boolean                                                     | —                               | false                                                                          |
| expand-row-keys         | set expanded rows by this prop, prop's value is the keys of expand rows, you should set row-key before using this prop                                                                                                                                                      | array                                                       | —                               | —                                                                              |
| default-sort            | set the default sort column and order. property `prop` is used to set default sort column, property `order` is used to set default sort order                                                                                                                               | object                                                      | `order`: ascending / descending | if `prop` is set, and `order` is not set, then `order` is default to ascending |
| tooltip-effect          | tooltip `effect` property                                                                                                                                                                                                                                                   | string                                                      | dark / light                    | dark                                                                           |
| show-summary            | whether to display a summary row                                                                                                                                                                                                                                            | boolean                                                     | —                               | false                                                                          |
| sum-text                | displayed text for the first column of summary row                                                                                                                                                                                                                          | string                                                      | —                               | Sum                                                                            |
| summary-method          | custom summary method                                                                                                                                                                                                                                                       | function(\{ columns, data \})                               | —                               | —                                                                              |
| span-method             | method that returns rowspan and colspan                                                                                                                                                                                                                                     | function(\{ row, column, rowIndex, columnIndex \})          | —                               | —                                                                              |
| select-on-indeterminate | controls the behavior of master checkbox in multi-select tables when only some rows are selected (but not all). If true, all rows will be selected, else deselected.                                                                                                        | boolean                                                     | —                               | true                                                                           |
| indent                  | horizontal indentation of tree data                                                                                                                                                                                                                                         | number                                                      | —                               | 16                                                                             |
| lazy                    | whether to lazy loading data                                                                                                                                                                                                                                                | boolean                                                     | —                               | —                                                                              |
| load                    | method for loading child row data, only works when `lazy` is true                                                                                                                                                                                                           | function(row, treeNode, resolve)                            | —                               | —                                                                              |
| tree-props              | configuration for rendering nested data                                                                                                                                                                                                                                     | object                                                      | —                               | `{ hasChildren: 'hasChildren', children: 'children' }`                         |
| table-layout            | Sets the algorithm used to lay out table cells, rows, and columns                                                                                                                                                                                                           | string                                                      | fixed / auto                    | fixed                                                                          |

## Table 事件

| Event Name         | Description                                                                                                                                  | Parameters                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| select             | triggers when user clicks the checkbox in a row                                                                                              | selection, row                    |
| select-all         | triggers when user clicks the checkbox in table header                                                                                       | selection                         |
| selection-change   | triggers when selection changes                                                                                                              | selection                         |
| cell-mouse-enter   | triggers when hovering into a cell                                                                                                           | row, column, cell, event          |
| cell-mouse-leave   | triggers when hovering out of a cell                                                                                                         | row, column, cell, event          |
| cell-click         | triggers when clicking a cell                                                                                                                | row, column, cell, event          |
| cell-dblclick      | triggers when double clicking a cell                                                                                                         | row, column, cell, event          |
| cell-contextmenu   | triggers when user right clicks on a cell                                                                                                    | row, column, cell, event          |
| row-click          | triggers when clicking a row                                                                                                                 | row, column, event                |
| row-contextmenu    | triggers when user right clicks on a row                                                                                                     | row, column, event                |
| row-dblclick       | triggers when double clicking a row                                                                                                          | row, column, event                |
| header-click       | triggers when clicking a column header                                                                                                       | column, event                     |
| header-contextmenu | triggers when user right clicks on a column header                                                                                           | column, event                     |
| sort-change        | triggers when Table's sorting changes                                                                                                        | `{ column, prop, order }`         |
| filter-change      | column's key. If you need to use the filter-change event, this attribute is mandatory to identify which column is being filtered             | filters                           |
| current-change     | triggers when current row changes                                                                                                            | currentRow, oldCurrentRow         |
| header-dragend     | triggers after changing a column's width by dragging the column header's border                                                              | newWidth, oldWidth, column, event |
| expand-change      | triggers when user expands or collapses a row (for expandable table, second param is expandedRows; for tree Table, second param is expanded) | row, (expandedRows \| expanded)   |

## Table 方法

| Method             | Description                                                                                                                                                       | Parameters                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| clearSelection     | used in multiple selection Table, clear user selection                                                                                                            | —                           |
| toggleRowSelection | used in multiple selection Table, toggle if a certain row is selected. With the second parameter, you can directly set if this row is selected                    | row, selected               |
| toggleAllSelection | used in multiple selection Table, toggle select all and deselect all                                                                                              | —                           |
| toggleRowExpansion | used in expandable Table or tree Table, toggle if a certain row is expanded. With the second parameter, you can directly set if this row is expanded or collapsed | row, expanded               |
| setCurrentRow      | used in single selection Table, set a certain row selected. If called without any parameter, it will clear selection.                                             | row                         |
| clearSort          | clear sorting, restore data to the original order                                                                                                                 | —                           |
| clearFilter        | clear filters of the columns whose `columnKey` are passed in. If no params, clear all filters                                                                     | columnKeys                  |
| doLayout           | refresh the layout of Table. When the visibility of Table changes, you may need to call this method to get a correct layout                                       | —                           |
| sort               | sort Table manually. Property `prop` is used to set sort column, property `order` is used to set sort order                                                       | prop: string, order: string |

## Table 插槽

| Name   | Description                                                                                                                                                                                   | Subtags      |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| -      | customize default content                                                                                                                                                                     | Table-column |
| append | Contents to be inserted after the last row. You may need this slot if you want to implement infinite scroll for the table. This slot will be displayed above the summary row if there is one. | —            |

## Table-column 属性

| Attribute             | Description                                                                                                                                                                                                         | Type                                    | Accepted Values                                                                                                                  | Default                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| type                  | type of the column. If set to `selection`, the column will display checkbox. If set to `index`, the column will display index of the row (staring from 1). If set to `expand`, the column will display expand icon. | string                                  | selection / index / expand                                                                                                       | —                                 |
| index                 | customize indices for each row, works on columns with `type=index`                                                                                                                                                  | number / function(index)                | —                                                                                                                                | —                                 |
| label                 | column label                                                                                                                                                                                                        | string                                  | —                                                                                                                                | —                                 |
| column-key            | column's key. If you need to use the filter-change event, you need this attribute to identify which column is being filtered                                                                                        | string                                  | —                                                                                                                                | —                                 |
| prop                  | field name. You can also use its alias: `property`                                                                                                                                                                  | string                                  | —                                                                                                                                | —                                 |
| width                 | column width                                                                                                                                                                                                        | string / number                         | —                                                                                                                                | —                                 |
| min-width             | column minimum width. Columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion                                                                          | string / number                         | —                                                                                                                                | —                                 |
| fixed                 | whether column is fixed at left / right. Will be fixed at left if `true`                                                                                                                                            | string / boolean                        | true / 'left' / 'right'                                                                                                          | —                                 |
| render-header         | render function for table header of this column                                                                                                                                                                     | function(\{ column, $index \})          | —                                                                                                                                | —                                 |
| sortable              | whether column can be sorted. Remote sorting can be done by setting this attribute to 'custom' and listening to the `sort-change` event of Table                                                                    | boolean / string                        | true / false / 'custom'                                                                                                          | false                             |
| sort-method           | sorting method, works when `sortable` is `true`. Should return a number, just like Array.sort                                                                                                                       | function(a, b)                          | —                                                                                                                                | —                                 |
| sort-by               | specify which property to sort by, works when `sortable` is `true` and `sort-method` is `undefined`. If set to an Array, the column will sequentially sort by the next property if the previous one is equal        | function(row, index) / string / array   | —                                                                                                                                | —                                 |
| sort-orders           | the order of the sorting strategies used when sorting the data, works when `sortable` is `true`. Accepts an array, as the user clicks on the header, the column is sorted in order of the elements in the array     | array                                   | the elements in the array need to be one of the following: `ascending`, `descending` and `null` (restores to the original order) | ['ascending', 'descending', null] |
| resizable             | whether column width can be resized, works when `border` of `el-table` is `true`                                                                                                                                    | boolean                                 | —                                                                                                                                | false                             |
| formatter             | function that formats cell content                                                                                                                                                                                  | function(row, column, cellValue, index) | —                                                                                                                                | —                                 |
| show-overflow-tooltip | whether to hide extra content and show them in a tooltip when hovering on the cell                                                                                                                                  | boolean                                 | —                                                                                                                                | false                             |
| align                 | alignment                                                                                                                                                                                                           | string                                  | left / center / right                                                                                                            | left                              |
| header-align          | alignment of the table header. If omitted, the value of the above `align` attribute will be applied                                                                                                                 | string                                  | left / center / right                                                                                                            | —                                 |
| class-name            | class name of cells in the column                                                                                                                                                                                   | string                                  | —                                                                                                                                | —                                 |
| label-class-name      | class name of the label of this column                                                                                                                                                                              | string                                  | —                                                                                                                                | —                                 |
| selectable            | function that determines if a certain row can be selected, works when `type` is 'selection'                                                                                                                         | function(row, index)                    | —                                                                                                                                | —                                 |
| reserve-selection     | whether to reserve selection after data refreshing, works when `type` is 'selection'. Note that `row-key` is required for this to work                                                                              | boolean                                 | —                                                                                                                                | false                             |
| filters               | an array of data filtering options. For each element in this array, `text` and `value` are required                                                                                                                 | array[{ text, value }]                  | —                                                                                                                                | —                                 |
| filter-placement      | placement for the filter dropdown                                                                                                                                                                                   | string                                  | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end  | —                                 |
| filter-multiple       | whether data filtering supports multiple options                                                                                                                                                                    | boolean                                 | —                                                                                                                                | true                              |
| filter-method         | data filtering method. If `filter-multiple` is on, this method will be called multiple times for each row, and a row will display if one of the calls returns `true`                                                | function(value, row, column)            | —                                                                                                                                | —                                 |
| filtered-value        | filter value for selected data, might be useful when table header is rendered with `render-header`                                                                                                                  | array                                   | —                                                                                                                                | —                                 |

## Table-column 插槽

| Name   | Description                                                                        |
| ------ | ---------------------------------------------------------------------------------- |
| —      | Custom content for table columns. The scope parameter is `{ row, column, $index }` |
| header | Custom content for table header. The scope parameter is `{ column, $index }`       |
