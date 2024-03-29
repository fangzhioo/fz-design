import type { InjectionKey, Ref } from 'vue';
import type { FzPopperContentInjectionContext, FzPopperInjectionContext, SliderContext } from '../components';

// global
export const FZ_CONFIG_PROVIDER_INJECT_KEY = Symbol('config-provider');
export const FZ_LOCALE_INJECT_KEY = Symbol('global-locale');
export const FZ_THEME_INJECT_KEY = Symbol('global-theme');
export const FZ_SIZE_INJECTION_KEY = Symbol('global-size');
export const FZ_Z_INDEX_INJECTION_KEY: InjectionKey<Ref<number | undefined>> = Symbol('global-z-index');

// 组件
export const FZ_BUTTON_GROUP_INJECT_KEY = Symbol('button-group');
export const FZ_CHECKBOX_GROUP_INJECT_KEY = Symbol('checkbox-group');
export const FZ_FORM_INJECT_KEY = Symbol('form');
export const FZ_FORM_ITEM_INJECT_KEY = Symbol('form-item');
export const FZ_SCROLLBAR_INJECT_KEY = Symbol('scrollbar');
export const FZ_BREADCRUMB_INJECT_KEY = Symbol('breadcrumb');
export const FZ_LAYOUT_ROW_INJECT_KEY = Symbol('layout-row');
export const FZ_CAROUSEL_INJECT_KEY = Symbol('carousel');
export const FZ_COLLAPSE_INJECT_KEY = Symbol('collapse');
export const FZ_FORWARD_REF_INJECT_KEY = Symbol('forward-ref');

// popper
export const FZ_POPPER_INJECT_KEY: InjectionKey<FzPopperInjectionContext> = Symbol('popper');
export const FZ_POPPER_CONTENT_INJECT_KEY: InjectionKey<FzPopperContentInjectionContext> = Symbol('popper-content');

export const FZ_TOOLTIP_INJECT_KEY = Symbol('tooptip');
export const FZ_SELECT_INJECT_KEY = Symbol('select');
export const FZ_SELECT_GROUP_INJECT_KEY = Symbol('select-group');
export const FZ_TABLE_INJECT_KEY = Symbol('table');
export const FZ_COLOR_PICKER_OPTIONS_KEY_INJECT_KEY = Symbol('color-picker-options-key');
export const FZ_RADIO_GROUP_INJECT_KEY = Symbol('radio-group');
export const FZ_POPPER_OPTIONS_INJECT_KEY = Symbol('popper-options');
export const FZ_PICKER_BASE_INJECT_KEY = Symbol('picker-base');
export const FZ_RICH_EDITOR_INSTANCE_INJECT_KEY = Symbol('rich-editor-instance');
export const FZ_PICKER_DATE_INJECT_KEY = Symbol('data-picker');
// slider
export const FZ_SLIDER_INJECT_KEY: InjectionKey<SliderContext> = Symbol('slider');

export const FZ_LOADING_INSTANCE_INJECT_KEY = Symbol('loading-instance');
export const FZ_FOCUS_TRAP_INSTANCE_INJECT_KEY = Symbol('focus-trap');
