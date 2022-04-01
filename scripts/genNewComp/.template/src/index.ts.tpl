import { ExtractPropTypes, PropType } from 'vue';
import type {{ compName }} from './{{ compName }}.vue';

export const {{ compClassName }}Props = {

};

export const {{ compClassName }}Emits = {

};

export type {{ compName }}Props = ExtractPropTypes<typeof {{ compClassName }}Props>;
export type {{ compName }}Emits = typeof {{ compClassName }}Emits;
export type {{ compName }}Instance = InstanceType<typeof {{ compName }}>;
