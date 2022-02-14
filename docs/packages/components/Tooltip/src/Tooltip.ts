import { ExtractPropTypes, PropType } from 'vue';
import type Tooltip from './Tooltip.vue';

export const tooltipEmits = {

};

export const tooltipProps = {

};

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;
export type TooltipEmits = typeof tooltipEmits;
export type TooltipInstance = InstanceType<typeof Tooltip>;
