<template>
  <div class="fz-rich-editor" v-if="editor">
    <slot name="menus" :editor="editor">
      <rich-editor-menus :options="options" />
    </slot>
    <editor-content class="fz-rich-editor__container" :editor="editor" />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import { useEditor, EditorContent, Content } from '@tiptap/vue-3';
import { FZ_RICH_EDITOR_INSTANCE_INJECT_KEY, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { richEditorProps } from './RichEditor';
import RichEditorMenus from './RichEditorMenus.vue';
import { StarterKit } from './extensions';

export default defineComponent({
  name: 'FzRichEditor',
  components: {
    EditorContent,
    RichEditorMenus,
  },
  props: richEditorProps,
  setup(props, context) {
    const onEditorUpdate = () => {
      if (!editor.value) {
        return;
      }
      const content = props.mode === 'json' ? editor.value.getJSON() : editor.value.getHTML();
      context.emit(UPDATE_MODEL_EVENT, content);
    };

    // 加载编辑器参数
    StarterKit.configure({ ...props.options });

    const editor = useEditor({
      editable: !props.disabled,
      content: props.modelValue,
      extensions: [StarterKit, ...props.extensions],
      onUpdate: onEditorUpdate,
    });

    provide(FZ_RICH_EDITOR_INSTANCE_INJECT_KEY, editor);

    // 这里的逻辑需要优化，触发emit之后每次会触发这里的动作，其实没啥必要，暂时不提供watch自动监听了，如需改变，可使用 setContent 来设置对应的内容
    // watch(
    //   () => props.modelValue,
    //   (content) => {
    //     if (!editor.value) {
    //       return;
    //     }

    //     const isSame =
    //       (props.mode === 'html' && editor.value.getHTML() === content) ||
    //       (props.mode === 'json' && JSON.stringify(editor.value.getJSON()) === JSON.stringify(content));

    //     if (isSame) {
    //       return;
    //     }
    //     // 这里的逻辑有问题，重新设置content之后，光标会自动移动到末尾，暂时注释掉
    //     editor.value.commands.setContent(content, false);
    //   },
    // );

    /**
     * 用来主动设置内容
     */
    const setContent = (content: Content, emitUpdate?: boolean | undefined, parseOptions?: any | undefined) => {
      if (!editor.value) {
        return;
      }
      editor.value.commands.setContent(content, emitUpdate, parseOptions);
    };

    context.expose({
      setContent,
    });

    return {
      editor,
    };
  },
});
</script>
