import { StyleValue } from 'vue';
declare const _default: import("vue").DefineComponent<{
    size: {
        type: import("vue").PropType<import('../../_hooks/use-size').ComponentSize>;
    };
    disabled: BooleanConstructor;
    modelValue: {
        type: import("vue").PropType<import("./Input").InputModelValue>;
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
        type: import("vue").PropType<import("./Input").AutoSize>;
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
        type: import("vue").PropType<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
        default: string;
    };
    prefixIcon: {
        type: import("vue").PropType<string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
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
        type: import("vue").PropType<string | object | Record<string, unknown>>;
        default: () => {};
    };
}, {
    input: import("vue").Ref<HTMLInputElement | undefined>;
    textarea: import("vue").Ref<HTMLTextAreaElement | undefined>;
    attrs: {
        [x: string]: unknown;
    };
    inputSize: import("vue").ComputedRef<"" | import('../../_hooks/use-size').ComponentSize>;
    validateState: import("vue").ComputedRef<string>;
    containerStyle: import("vue").ComputedRef<StyleValue>;
    computedTextareaStyle: import("vue").ComputedRef<StyleValue>;
    inputDisabled: import("vue").ComputedRef<boolean>;
    showClear: import("vue").ComputedRef<boolean>;
    showPwdVisible: import("vue").ComputedRef<boolean>;
    isWordLimitVisible: import("vue").ComputedRef<boolean>;
    textLength: import("vue").ComputedRef<number>;
    hovering: import("vue").Ref<boolean>;
    inputExceed: import("vue").ComputedRef<boolean>;
    passwordVisible: import("vue").Ref<boolean>;
    inputOrTextarea: import("vue").ComputedRef<HTMLInputElement | HTMLTextAreaElement | undefined>;
    suffixVisible: import("vue").ComputedRef<boolean>;
    resizeTextarea: () => void;
    handleInput: (event: Event) => void;
    handleChange: (event: Event) => void;
    handleFocus: (event: FocusEvent) => void;
    handleBlur: (event: FocusEvent) => void;
    handleCompositionStart: (event: CompositionEvent) => void;
    handleCompositionUpdate: (event: CompositionEvent) => void;
    handleCompositionEnd: (event: CompositionEvent) => void;
    handlePasswordVisible: () => void;
    clear: () => void;
    select: () => void;
    focus: () => void;
    blur: () => void;
    onMouseLeave: (evt: MouseEvent) => void;
    onMouseEnter: (evt: MouseEvent) => void;
    handleKeydown: (evt: KeyboardEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
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
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    size?: unknown;
    disabled?: unknown;
    modelValue?: unknown;
    type?: unknown;
    resize?: unknown;
    autosize?: unknown;
    autocomplete?: unknown;
    placeholder?: unknown;
    form?: unknown;
    readonly?: unknown;
    clearable?: unknown;
    showPassword?: unknown;
    showWordLimit?: unknown;
    suffixIcon?: unknown;
    prefixIcon?: unknown;
    label?: unknown;
    tabindex?: unknown;
    validateEvent?: unknown;
    inputStyle?: unknown;
} & {
    disabled: boolean;
    form: string;
    type: string;
    modelValue: import("./Input").InputModelValue;
    autosize: import("./Input").AutoSize;
    autocomplete: string;
    readonly: boolean;
    clearable: boolean;
    showPassword: boolean;
    showWordLimit: boolean;
    suffixIcon: string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>;
    prefixIcon: string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>;
    validateEvent: boolean;
    inputStyle: string | object | Record<string, unknown>;
} & {
    size?: import('../../_hooks/use-size').ComponentSize | undefined;
    placeholder?: string | undefined;
    resize?: string | undefined;
    label?: string | undefined;
    tabindex?: string | number | undefined;
}> & {
    onClear?: (() => any) | undefined;
    onInput?: ((value: string) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onFocus?: ((evt: FocusEvent) => any) | undefined;
    onBlur?: ((evt: FocusEvent) => any) | undefined;
    onMouseleave?: ((evt: MouseEvent) => any) | undefined;
    onMouseenter?: ((evt: MouseEvent) => any) | undefined;
    onKeydown?: ((evt: KeyboardEvent) => any) | undefined;
    onCompositionstart?: ((evt: CompositionEvent) => any) | undefined;
    onCompositionupdate?: ((evt: CompositionEvent) => any) | undefined;
    onCompositionend?: ((evt: CompositionEvent) => any) | undefined;
}, {
    disabled: boolean;
    form: string;
    type: string;
    modelValue: import("./Input").InputModelValue;
    autosize: import("./Input").AutoSize;
    autocomplete: string;
    readonly: boolean;
    clearable: boolean;
    showPassword: boolean;
    showWordLimit: boolean;
    suffixIcon: string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>;
    prefixIcon: string | import("vue").Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>;
    validateEvent: boolean;
    inputStyle: string | object | Record<string, unknown>;
}>;
export default _default;
