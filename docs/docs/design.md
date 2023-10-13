# 设计规范

提供一些组件默认的规范。

## 主题色

颜色分为一下几个类型： primary, success, warning, danger, error, info

css变量名：--fz-color-primary

对应色值：

'primary': (
    'base': #8670ff,
),
'success': (
    'base': #67c23a,
),
'warning': (
    'base': #e6a23c,
),
'danger': (
    'base': #f56c6c,
),
'error': (
    'base': #f56c6c,
),
'info': (
    'base': #909399,
)

以及 white 和 black

'white': #ffffff,
'black': #000000,

## 文字颜色

css变量名：--fz-text-color-primary

'primary': #303133,
'regular': #606266,
'secondary': #909399,
'placeholder': #a8abb2,
'disabled': #c0c4cc,

## 边框颜色

css变量名：--fz-border-color / --fz-border-color-light

'': #dcdfe6,
'light': #e4e7ed,
'lighter': #ebeef5,
'extra-light': #f2f6fc,
'dark': #d4d7de,
'darker': #cdd0d6,

## 填充色

css变量名：--fz-fill-color / --fz-fill-color-light

'': #f0f2f5,
'light': #f5f7fa,
'lighter': #fafafa,
'extra-light': #fafcff,
'dark': #ebedf0,
'darker': #e6e8eb,
'blank': #ffffff,

## 背景色

css变量名：--fz-bg-color / --fz-bg-color-page

'': #ffffff,
'page': #f2f3f5,
'overlay': #ffffff,

## 边框样式

--fz-border-width: 1px;
--fz-border-style: solid;
--fz-border-color-hover: var(--fz-text-color-disabled);
--fz-border: var(--fz-border-width) var(--fz-border-style) var(--fz-border-color);

--fz-border-radius-base: 4px;
--fz-border-radius-small: 2px;
--fz-border-radius-round: 20px;
--fz-border-radius-circle: 100%;

## 阴影样式

--fz-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
--fz-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, .12);
--fz-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, .12);
--fz-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, .08), 0px 12px 32px rgba(0, 0, 0, .12), 0px 8px 16px -8px rgba(0, 0, 0, .16);

## 文本样式

--fz-font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

--fz-font-size-extra-large: 20px;
--fz-font-size-large: 18px;
--fz-font-size-medium: 16px;
--fz-font-size-base: 14px;
--fz-font-size-small: 13px;
--fz-font-size-extra-small: 12px;

## Index

--fz-index-normal: 1;
--fz-index-top: 1000;
--fz-index-popper: 2000;

## Disable

--fz-disabled-bg-color: var(--fz-fill-color-light);
--fz-disabled-text-color: var(--fz-text-color-placeholder);
--fz-disabled-border-color: var(--fz-border-color-light);

## 组件大小

--fz-component-size-large: 40px;
--fz-component-size: 32px;
--fz-component-size-small: 24px

## 覆盖层颜色

--fz-overlay-color: rgba(0, 0, 0, .8);
--fz-overlay-color-light: rgba(0, 0, 0, .7);
--fz-overlay-color-lighter: rgba(0, 0, 0, .5);

## 遮罩层颜色

--fz-mask-color: rgba(255, 255, 255, .9);
--fz-mask-color-extra-light: rgba(255, 255, 255, .3);