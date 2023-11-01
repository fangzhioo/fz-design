import type { Component } from 'vue';

/** 组件大小 - 尺寸 */
export type ComponentSize = '' | 'small' | 'default' | 'large';

/** 组件类型 - 颜色 */
export type ComponentType = 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default';

/**
 * svg图标组件
 * 参考：https://github.com/fangzhioo/fz-design/blob/master/packages/fz-design-icon/README.md
 */
export type IconSlotType = Component;
