declare const _default: import("vue").DefineComponent<{
    size: {
        type: import("vue").PropType<import('../../_hooks/use-size').ComponentSize>;
        default: string;
    };
    type: {
        type: import("vue").PropType<import("./Button").ButtonType>;
        default: string;
    };
    nativeType: {
        type: import("vue").PropType<import("./Button").ButtonNativeType>;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoInsertSpace: {
        type: BooleanConstructor;
        default: undefined;
    };
}, {
    buttonRef: import("vue").Ref<any>;
    shouldAddSpace: import("vue").ComputedRef<boolean>;
    buttonType: import("vue").ComputedRef<import("./Button").ButtonType>;
    buttonSize: import("vue").ComputedRef<"" | import('../../_hooks/use-size').ComponentSize>;
    buttonDisabled: import("vue").ComputedRef<boolean>;
    buttonStyle: import("vue").ComputedRef<{}>;
    handleClick: (evt: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (evt: MouseEvent) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    size?: unknown;
    type?: unknown;
    nativeType?: unknown;
    disabled?: unknown;
    color?: unknown;
    loading?: unknown;
    plain?: unknown;
    round?: unknown;
    circle?: unknown;
    autofocus?: unknown;
    autoInsertSpace?: unknown;
} & {
    size: import('../../_hooks/use-size').ComponentSize;
    round: boolean;
    disabled: boolean;
    type: import("./Button").ButtonType;
    loading: boolean;
    nativeType: import("./Button").ButtonNativeType;
    color: string;
    plain: boolean;
    circle: boolean;
    autofocus: boolean;
} & {
    autoInsertSpace?: boolean | undefined;
}> & {
    onClick?: ((evt: MouseEvent) => any) | undefined;
}, {
    size: import('../../_hooks/use-size').ComponentSize;
    round: boolean;
    disabled: boolean;
    type: import("./Button").ButtonType;
    loading: boolean;
    nativeType: import("./Button").ButtonNativeType;
    color: string;
    plain: boolean;
    circle: boolean;
    autofocus: boolean;
    autoInsertSpace: boolean;
}>;
export default _default;
