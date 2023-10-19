# css theme

## light

```css
@charset "UTF-8";

:root {
    --fz-color-white: #ffffff;
    --fz-color-black: #000000;
    --fz-color-primary-rgb: 64, 158, 255;
    --fz-color-success-rgb: 103, 194, 58;
    --fz-color-warning-rgb: 230, 162, 60;
    --fz-color-danger-rgb: 245, 108, 108;
    --fz-color-error-rgb: 245, 108, 108;
    --fz-color-info-rgb: 144, 147, 153;
    --fz-font-size-extra-large: 20px;
    --fz-font-size-large: 18px;
    --fz-font-size-medium: 16px;
    --fz-font-size-base: 14px;
    --fz-font-size-small: 13px;
    --fz-font-size-extra-small: 12px;
    --fz-font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    --fz-font-weight-primary: 500;
    --fz-font-line-height-primary: 24px;
    --fz-index-normal: 1;
    --fz-index-top: 1000;
    --fz-index-popper: 2000;
    --fz-border-radius-base: 4px;
    --fz-border-radius-small: 2px;
    --fz-border-radius-round: 20px;
    --fz-border-radius-circle: 100%;
    --fz-transition-duration: .3s;
    --fz-transition-duration-fast: .2s;
    --fz-transition-function-ease-in-out-bezier: cubic-bezier(.645, .045, .355, 1);
    --fz-transition-function-fast-bezier: cubic-bezier(.23, 1, .32, 1);
    --fz-transition-all: all var(--fz-transition-duration) var(--fz-transition-function-ease-in-out-bezier);
    --fz-transition-fade: opacity var(--fz-transition-duration) var(--fz-transition-function-fast-bezier);
    --fz-transition-md-fade: transform var(--fz-transition-duration) var(--fz-transition-function-fast-bezier), opacity var(--fz-transition-duration) var(--fz-transition-function-fast-bezier);
    --fz-transition-fade-linear: opacity var(--fz-transition-duration-fast) linear;
    --fz-transition-border: border-color var(--fz-transition-duration-fast) var(--fz-transition-function-ease-in-out-bezier);
    --fz-transition-box-shadow: box-shadow var(--fz-transition-duration-fast) var(--fz-transition-function-ease-in-out-bezier);
    --fz-transition-color: color var(--fz-transition-duration-fast) var(--fz-transition-function-ease-in-out-bezier);
    --fz-component-size-large: 40px;
    --fz-component-size: 32px;
    --fz-component-size-small: 24px
}

:root {
    color-scheme: light;
    --fz-color-white: #ffffff;
    --fz-color-black: #000000;
    --fz-color-primary: #409eff;
    --fz-color-primary-light-3: #79bbff;
    --fz-color-primary-light-5: #a0cfff;
    --fz-color-primary-light-7: #c6e2ff;
    --fz-color-primary-light-8: #d9ecff;
    --fz-color-primary-light-9: #ecf5ff;
    --fz-color-primary-dark-2: #337ecc;
    --fz-color-success: #67c23a;
    --fz-color-success-light-3: #95d475;
    --fz-color-success-light-5: #b3e19d;
    --fz-color-success-light-7: #d1edc4;
    --fz-color-success-light-8: #e1f3d8;
    --fz-color-success-light-9: #f0f9eb;
    --fz-color-success-dark-2: #529b2e;
    --fz-color-warning: #e6a23c;
    --fz-color-warning-light-3: #eebe77;
    --fz-color-warning-light-5: #f3d19e;
    --fz-color-warning-light-7: #f8e3c5;
    --fz-color-warning-light-8: #faecd8;
    --fz-color-warning-light-9: #fdf6ec;
    --fz-color-warning-dark-2: #b88230;
    --fz-color-danger: #f56c6c;
    --fz-color-danger-light-3: #f89898;
    --fz-color-danger-light-5: #fab6b6;
    --fz-color-danger-light-7: #fcd3d3;
    --fz-color-danger-light-8: #fde2e2;
    --fz-color-danger-light-9: #fef0f0;
    --fz-color-danger-dark-2: #c45656;
    --fz-color-error: #f56c6c;
    --fz-color-error-light-3: #f89898;
    --fz-color-error-light-5: #fab6b6;
    --fz-color-error-light-7: #fcd3d3;
    --fz-color-error-light-8: #fde2e2;
    --fz-color-error-light-9: #fef0f0;
    --fz-color-error-dark-2: #c45656;
    --fz-color-info: #909399;
    --fz-color-info-light-3: #b1b3b8;
    --fz-color-info-light-5: #c8c9cc;
    --fz-color-info-light-7: #dedfe0;
    --fz-color-info-light-8: #e9e9eb;
    --fz-color-info-light-9: #f4f4f5;
    --fz-color-info-dark-2: #73767a;
    --fz-bg-color: #ffffff;
    --fz-bg-color-page: #f2f3f5;
    --fz-bg-color-overlay: #ffffff;
    --fz-text-color-primary: #303133;
    --fz-text-color-regular: #606266;
    --fz-text-color-secondary: #909399;
    --fz-text-color-placeholder: #a8abb2;
    --fz-text-color-disabled: #c0c4cc;
    --fz-border-color: #dcdfe6;
    --fz-border-color-light: #e4e7ed;
    --fz-border-color-lighter: #ebeef5;
    --fz-border-color-extra-light: #f2f6fc;
    --fz-border-color-dark: #d4d7de;
    --fz-border-color-darker: #cdd0d6;
    --fz-fill-color: #f0f2f5;
    --fz-fill-color-light: #f5f7fa;
    --fz-fill-color-lighter: #fafafa;
    --fz-fill-color-extra-light: #fafcff;
    --fz-fill-color-dark: #ebedf0;
    --fz-fill-color-darker: #e6e8eb;
    --fz-fill-color-blank: #ffffff;
    --fz-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
    --fz-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, .12);
    --fz-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, .12);
    --fz-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, .08), 0px 12px 32px rgba(0, 0, 0, .12), 0px 8px 16px -8px rgba(0, 0, 0, .16);
    --fz-disabled-bg-color: var(--fz-fill-color-light);
    --fz-disabled-text-color: var(--fz-text-color-placeholder);
    --fz-disabled-border-color: var(--fz-border-color-light);
    --fz-overlay-color: rgba(0, 0, 0, .8);
    --fz-overlay-color-light: rgba(0, 0, 0, .7);
    --fz-overlay-color-lighter: rgba(0, 0, 0, .5);
    --fz-mask-color: rgba(255, 255, 255, .9);
    --fz-mask-color-extra-light: rgba(255, 255, 255, .3);
    --fz-border-width: 1px;
    --fz-border-style: solid;
    --fz-border-color-hover: var(--fz-text-color-disabled);
    --fz-border: var(--fz-border-width) var(--fz-border-style) var(--fz-border-color);
    --fz-svg-monochrome-grey: var(--fz-border-color)
}
```



## dark

```css

html.dark {
    color-scheme: dark;
    --fz-color-primary: #409eff;
    --fz-color-primary-light-3: #3375b9;
    --fz-color-primary-light-5: #2a598a;
    --fz-color-primary-light-7: #213d5b;
    --fz-color-primary-light-8: #1d3043;
    --fz-color-primary-light-9: #18222c;
    --fz-color-primary-dark-2: #66b1ff;
    --fz-color-success: #67c23a;
    --fz-color-success-light-3: #4e8e2f;
    --fz-color-success-light-5: #3e6b27;
    --fz-color-success-light-7: #2d481f;
    --fz-color-success-light-8: #25371c;
    --fz-color-success-light-9: #1c2518;
    --fz-color-success-dark-2: #85ce61;
    --fz-color-warning: #e6a23c;
    --fz-color-warning-light-3: #a77730;
    --fz-color-warning-light-5: #7d5b28;
    --fz-color-warning-light-7: #533f20;
    --fz-color-warning-light-8: #3e301c;
    --fz-color-warning-light-9: #292218;
    --fz-color-warning-dark-2: #ebb563;
    --fz-color-danger: #f56c6c;
    --fz-color-danger-light-3: #b25252;
    --fz-color-danger-light-5: #854040;
    --fz-color-danger-light-7: #582e2e;
    --fz-color-danger-light-8: #412626;
    --fz-color-danger-light-9: #2b1d1d;
    --fz-color-danger-dark-2: #f78989;
    --fz-color-error: #f56c6c;
    --fz-color-error-light-3: #b25252;
    --fz-color-error-light-5: #854040;
    --fz-color-error-light-7: #582e2e;
    --fz-color-error-light-8: #412626;
    --fz-color-error-light-9: #2b1d1d;
    --fz-color-error-dark-2: #f78989;
    --fz-color-info: #909399;
    --fz-color-info-light-3: #6b6d71;
    --fz-color-info-light-5: #525457;
    --fz-color-info-light-7: #393a3c;
    --fz-color-info-light-8: #2d2d2f;
    --fz-color-info-light-9: #202121;
    --fz-color-info-dark-2: #a6a9ad;
    --fz-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .36), 0px 8px 20px rgba(0, 0, 0, .72);
    --fz-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, .72);
    --fz-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, .72);
    --fz-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, .72), 0px 12px 32px #000000, 0px 8px 16px -8px #000000;
    --fz-bg-color-page: #0a0a0a;
    --fz-bg-color: #141414;
    --fz-bg-color-overlay: #1d1e1f;
    --fz-text-color-primary: #E5EAF3;
    --fz-text-color-regular: #CFD3DC;
    --fz-text-color-secondary: #A3A6AD;
    --fz-text-color-placeholder: #8D9095;
    --fz-text-color-disabled: #6C6E72;
    --fz-border-color-darker: #636466;
    --fz-border-color-dark: #58585B;
    --fz-border-color: #4C4D4F;
    --fz-border-color-light: #414243;
    --fz-border-color-lighter: #363637;
    --fz-border-color-extra-light: #2B2B2C;
    --fz-fill-color-darker: #424243;
    --fz-fill-color-dark: #39393A;
    --fz-fill-color: #303030;
    --fz-fill-color-light: #262727;
    --fz-fill-color-lighter: #1D1D1D;
    --fz-fill-color-extra-light: #191919;
    --fz-fill-color-blank: transparent;
    --fz-mask-color: rgba(0, 0, 0, .8);
    --fz-mask-color-extra-light: rgba(0, 0, 0, .3)
}

html.dark .fz-button {
    --fz-button-disabled-text-color: rgba(255, 255, 255, .5)
}

html.dark .fz-card {
    --fz-card-bg-color: var(--fz-bg-color-overlay)
}

html.dark .fz-empty {
    --fz-empty-fill-color-0: var(--fz-color-black);
    --fz-empty-fill-color-1: #4b4b52;
    --fz-empty-fill-color-2: #36383d;
    --fz-empty-fill-color-3: #1e1e20;
    --fz-empty-fill-color-4: #262629;
    --fz-empty-fill-color-5: #202124;
    --fz-empty-fill-color-6: #212224;
    --fz-empty-fill-color-7: #1b1c1f;
    --fz-empty-fill-color-8: #1c1d1f;
    --fz-empty-fill-color-9: #18181a
}
```