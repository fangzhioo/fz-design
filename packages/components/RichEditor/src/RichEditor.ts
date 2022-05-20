import { UPDATE_MODEL_EVENT } from '@fzui/constants';
import { ExtractPropTypes, PropType } from 'vue';
import { StarterKitOptions } from './extensions';
import type RichEditor from './RichEditor.vue';

export type RichEditorMode = 'html' | 'json';

export const richEditorProps = {
  modelValue: {
    type: String,
    default: '',
  },
  mode: {
    type: String as PropType<RichEditorMode>,
    defalut: 'html', // json/html
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object as PropType<StarterKitOptions>,
    default: () => ({}),
  },
};

export const richEditorMenusProps = {
  options: {
    type: Object as PropType<StarterKitOptions>,
    default: () => ({}),
  },
};

export const richEditorEmits = [UPDATE_MODEL_EVENT];

export type RichEditorProps = ExtractPropTypes<typeof richEditorProps>;
export type RichEditorEmits = typeof richEditorEmits;
export type RichEditorInstance = InstanceType<typeof RichEditor>;
