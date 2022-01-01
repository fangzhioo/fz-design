import type { Component, ExtractPropTypes, PropType } from 'vue';
import { ComponentSize } from '../../_hooks/use-size';
import type Input from './Input.vue';
export declare type InputModelValue = string | number | null | undefined;
export declare type InputSize = ComponentSize;
export declare type AutoSize = {
    minRows?: number;
    maxRows?: number;
} | boolean;
export declare type TargetElement = HTMLInputElement | HTMLTextAreaElement;
export declare const PENDANT_MAP: {
    readonly suffix: "append";
    readonly prefix: "prepend";
};
export declare const inputProps: {
    size: {
        type: PropType<ComponentSize>;
    };
    disabled: BooleanConstructor;
    modelValue: {
        type: PropType<InputModelValue>;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    resize: {
        type: StringConstructor;
        values: string[];
    };
    autosize: {
        type: PropType<AutoSize>;
        default: boolean;
    };
    autocomplete: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
    };
    form: {
        type: StringConstructor;
        default: string;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPassword: {
        type: BooleanConstructor;
        default: boolean;
    };
    showWordLimit: {
        type: BooleanConstructor;
        default: boolean;
    };
    suffixIcon: {
        type: PropType<string | Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
        default: string;
    };
    prefixIcon: {
        type: PropType<string | Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
        default: string;
    };
    label: {
        type: StringConstructor;
    };
    tabindex: {
        type: (StringConstructor | NumberConstructor)[];
    };
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputStyle: {
        type: PropType<string | object | Record<string, unknown>>;
        default: () => {};
    };
};
export declare const inputEmits: {
    "update:modelValue": (value: string) => boolean;
    input: (value: string) => boolean;
    change: (value: string) => boolean;
    focus: (evt: FocusEvent) => boolean;
    blur: (evt: FocusEvent) => boolean;
    clear: () => boolean;
    mouseleave: (evt: MouseEvent) => boolean;
    mouseenter: (evt: MouseEvent) => boolean;
    keydown: (evt: KeyboardEvent) => boolean;
    compositionstart: (evt: CompositionEvent) => boolean;
    compositionupdate: (evt: CompositionEvent) => boolean;
    compositionend: (evt: CompositionEvent) => boolean;
};
export declare type InputProps = ExtractPropTypes<typeof inputProps>;
export declare type InputEmits = typeof inputEmits;
export declare type InputInstance = InstanceType<typeof Input>;
