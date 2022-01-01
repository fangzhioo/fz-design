import { ExtractPropTypes } from 'vue';
import type ButtonGroup from './ButtonGroup.vue';
export declare const buttonGroupProps: {
    readonly size: {
        type: import("vue").PropType<import("../../_hooks/use-size").ComponentSize>;
        default: string;
    };
    readonly type: {
        type: import("vue").PropType<import("./Button").ButtonType>;
        default: string;
    };
};
export declare type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>;
export declare type ButtonGroupInstance = InstanceType<typeof ButtonGroup>;
