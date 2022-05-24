import { UPDATE_MODEL_EVENT } from '@fzui/constants';
import { Extension, Editor as IEditor } from '@tiptap/vue-3';
import { ExtractPropTypes, PropType } from 'vue';
import { StarterKitOptions } from './extensions';
import type RichEditor from './RichEditor.vue';

export type Editor = IEditor;
export type RichEditorMode = 'html' | 'json';
export type RichEditorExtension = Extension;

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
  extensions: {
    type: Array as PropType<Array<RichEditorExtension>>,
    default: () => [],
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
