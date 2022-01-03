import { ExtractPropTypes } from 'vue';
import type Container from './Container.vue';
export declare const containerEmits: {};
export declare const containerProps: {
    direction: {
        type: StringConstructor;
        default: string;
    };
};
export declare type ContainerProps = ExtractPropTypes<typeof containerProps>;
export declare type ContainerEmits = typeof containerEmits;
export declare type ContainerInstance = InstanceType<typeof Container>;
