import { ComponentSize } from '../../_hooks/use-size';
import { ExtractPropTypes, PropType } from 'vue';
export declare type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'error' | 'text';
export declare type ButtonNativeType = 'button' | 'submit' | 'reset';
export declare type ButtonSize = ComponentSize;
export declare const buttonEmits: {
    click: (evt: MouseEvent) => boolean;
};
export declare const buttonProps: {
    size: {
        type: PropType<ComponentSize>;
        default: string;
    };
    type: {
        type: PropType<ButtonType>;
        default: string;
    };
    nativeType: {
        type: PropType<ButtonNativeType>;
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
};
export declare type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export declare type ButtonEmits = typeof buttonEmits;
declare const _default: import("vue").DefineComponent<{
    size: {
        type: PropType<ComponentSize>;
        default: string;
    };
    type: {
        type: PropType<ButtonType>;
        default: string;
    };
    nativeType: {
        type: PropType<ButtonNativeType>;
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
    shouldAddSpace: import("vue").ComputedRef<boolean>;
    buttonType: import("vue").ComputedRef<ButtonType>;
    buttonSize: import("vue").ComputedRef<ComponentSize | "">;
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
    size: ComponentSize;
    type: ButtonType;
    nativeType: ButtonNativeType;
    disabled: boolean;
    color: string;
    loading: boolean;
    plain: boolean;
    round: boolean;
    circle: boolean;
    autofocus: boolean;
} & {
    autoInsertSpace?: boolean | undefined;
}> & {
    onClick?: ((evt: MouseEvent) => any) | undefined;
}, {
    size: ComponentSize;
    type: ButtonType;
    nativeType: ButtonNativeType;
    disabled: boolean;
    color: string;
    loading: boolean;
    plain: boolean;
    round: boolean;
    circle: boolean;
    autofocus: boolean;
    autoInsertSpace: boolean;
}>;
export default _default;
