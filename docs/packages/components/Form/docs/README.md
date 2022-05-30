<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
import demo4 from './demo4.vue'
import demo5 from './demo5.vue'
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 表单

表单包含 输入框, 单选框, 下拉选择, 多选框 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。

## 基础用法

最基础的表单包括各种输入表单项，比如 `input`、`select`、`radio`、`checkbox`等。在每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值。

<demo-preview comp-name="Form" demo-name="demo">
  <demo />
</demo-preview>

## 行内样式

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。通过设置 `inline` 属性为 `true` 可以让表单域变为行内的表单域。

<demo-preview comp-name="Form" demo-name="demo2">
  <demo2 />
</demo-preview>

## 对齐方式

根据你们的设计情况，来选择最佳的标签对齐方式。通过设置 `label-position` 属性可以改变表单域标签的位置，可选值为 top、left， 当设为 top 时标签会置于表单域的顶部

<demo-preview comp-name="Form" demo-name="demo3">
  <demo3 />
</demo-preview>

## 表单校验

Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则，并将 form-Item 的 prop 属性设置为需要验证的特殊键值即可。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

<demo-preview comp-name="Form" demo-name="demo4">
  <demo4 />
</demo-preview>

## 尺寸控制

表单中的所有子组件都继承了该表单的 size 属性。 同样，form-item 也有一个 size 属性。如果希望某个表单项或某个表单组件的尺寸不同于 Form 上的 size 属性，直接为这个表单项或表单组件设置自己的 size 属性即可。

<demo-preview comp-name="Form" demo-name="demo5">
  <demo5 />
</demo-preview>

## 配置

### Form Attributes

| Attribute                 | Description                                                                                                                    | Type                              | Default   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | --------- |
| `model`                   | Data of form component.                                                                                                        | `Record<string, any>`             | —         |
| `rules`                   | Validation rules of form.                                                                                                      | `FormRules`                       | —         |
| `inline`                  | Whether the form is inline.                                                                                                    | `boolean`                         | `false`   |
| `label-position`          | Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required.                                       | `'left' \| 'right' \| 'top'`      | `'right'` |
| `label-width`             | Width of label, e.g. `'50px'`. All its direct child form items will inherit this value. `auto` is supported.                   | `string \| number`                | —         |
| `label-suffix`            | Suffix of the label.                                                                                                           | `string`                          | —         |
| `hide-required-asterisk`  | Whether required fields should have a red asterisk (star) beside their labels.                                                 | `boolean`                         | `false`   |
| `show-message`            | Whether to show the error message.                                                                                             | `boolean`                         | `true`    |
| `inline-message`          | Whether to display the error message inline with the form item.                                                                | `boolean`                         | `false`   |
| `status-icon`             | Whether to display an icon indicating the validation result.                                                                   | `boolean`                         | `false`   |
| `validate-on-rule-change` | Whether to trigger validation when the `rules` prop is changed.                                                                | `boolean`                         | `true`    |
| `size`                    | Control the size of components in this form.                                                                                   | `'large' \| 'default' \| 'small'` | —         |
| `disabled`                | Whether to disable all components in this form. If set to `true`, it will override the `disabled` prop of the inner component. | `boolean`                         | `false`   |

### Form Methods

| Method          | Description                                                        | Type                                                                                                                             |
| --------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `validate`      | Validate the whole form. Receives a callback or returns `Promise`. | `(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>`                                  |
| `validateField` | Validate specified fields.                                         | `(props?: Arrayable<FormItemProp>, callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |
| `resetFields`   | Reset specified fields and remove validation result.               | `(props?: Arrayable<FormItemProp>) => void`                                                                                      |
| `scrollToField` | Scroll to the specified fields.                                    | `(prop: FormItemProp) => void`                                                                                                   |
| `clearValidate` | Clear validation message for specified fields.                     | `(props?: Arrayable<FormItemProp>) => void`                                                                                      |

### Form Events

| Event Name | Description                             | Parameters                                                        |
| ---------- | --------------------------------------- | ----------------------------------------------------------------- |
| `validate` | triggers after a form item is validated | `(prop: FormItemProp, isValid: boolean, message: string) => void` |

### Form Slots

| Name | Description               | Subtags  |
| ---- | ------------------------- | -------- |
| -    | customize default content | FormItem |

## Form Item API

### Form Item Attributes

| Attribute        | Description                                                                                                                                                   | Type                              | Default     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `prop`           | A key of `model`. It could be an array of property paths (e.g `['a', 'b', 0]`). In the use of `validate` and `resetFields` method, the attribute is required. | `string \| string[]`              | —           |
| `label`          | Label text.                                                                                                                                                   | `string`                          | —           |
| `label-width`    | Width of label, e.g. `'50px'`. `'auto'` is supported.                                                                                                         | `string \| number`                | —           |
| `required`       | Whether the field is required or not, will be determined by validation rules if omitted.                                                                      | `boolean`                         | `false`     |
| `rules`          | Validation rules of form, see the following table, more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).                     | `FormItemRule \| FormItemRule[]`  | —           |
| `error`          | Field error message, set its value and the field will validate error and show this message immediately.                                                       | `string`                          | —           |
| `show-message`   | Whether to show the error message.                                                                                                                            | `boolean`                         | `true`      |
| `inline-message` | Inline style validate message.                                                                                                                                | `boolean`                         | `false`     |
| `size`           | Control the size of components in this form-item.                                                                                                             | `'large' \| 'default' \| 'small'` | `'default'` |

#### FormItemRule

| Name      | Description                     | Type                 | Default |
| --------- | ------------------------------- | -------------------- | ------- |
| `trigger` | How the validator is triggered. | `'blur' \| 'change'` | —       |

### Form Item Slots

| Name    | Description                                   | Slot Scope  |
| ------- | --------------------------------------------- | ----------- |
| —       | Content of Form Item.                         | —           |
| `label` | Custom content to display on label.           | `{ label }` |
| `error` | Custom content to display validation message. | `{ error }` |

### Form Item Methods

| Method          | Description                                       | Type         |
| --------------- | ------------------------------------------------- | ------------ |
| `resetField`    | Reset current field and remove validation result. | `() => void` |
| `clearValidate` | Remove validation status of the field.            | `() => void` |
