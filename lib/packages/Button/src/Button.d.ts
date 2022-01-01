import { ExtractPropTypes, PropType } from 'vue';
import { ComponentSize } from '../../_hooks/use-size';
import type Button from './Button.vue';
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
export declare type ButtonInstance = InstanceType<typeof Button>;
