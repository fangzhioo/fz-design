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
      extensions: [StarterKit],
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

<style lang="less">
.fz-rich-editor {
  padding: 12px;
  --fz-rich-editor-border-radius: 4px;
  border-radius: var(--fz-rich-editor-border-radius);
  box-shadow: var(--fz-box-shadow-light);

  .fz-rich-editor__container {
    min-height: 300px;
    font-size: 16px;

    /* Basic editor styles */
    .ProseMirror {
      &:focus {
        outline: none;
      }

      > * + * {
        margin-top: 8px;
      }

      ul,
      ol {
        padding: 0 14px;
      }
      ul {
        list-style-type: disc;
      }
      ol {
        list-style-type: decimal;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        line-height: 1.1;
      }

      em {
        font-style: italic;
      }

      code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
      }

      pre {
        background: #0d0d0d;
        color: #fff;
        font-family: 'JetBrainsMono', monospace;
        padding: 10px 12px;
        border-radius: 6px;

        code {
          color: inherit;
          padding: 0;
          background: none;
          font-size: 12px;
        }
      }

      img {
        max-width: 100%;
        height: auto;
      }

      blockquote {
        padding-left: 12px;
        border-left: 2px solid rgba(#0d0d0d, 0.1);
      }

      hr {
        border: none;
        border-top: 2px solid rgba(#0d0d0d, 0.1);
        margin: 20px 0;
      }
    }

    /* Table-specific styling */
    .ProseMirror {
      table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
        margin: 0;
        overflow: hidden;

        td,
        th {
          min-width: 1em;
          border: 2px solid #ced4da;
          padding: 3px 5px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;

          > * {
            margin-bottom: 0;
          }
        }

        th {
          font-weight: bold;
          text-align: left;
          background-color: #f1f3f5;
        }

        .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: '';
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: rgba(200, 200, 255, 0.4);
          pointer-events: none;
        }

        .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: -2px;
          width: 4px;
          background-color: #adf;
          pointer-events: none;
        }

        p {
          margin: 0;
        }
      }

      .tableWrapper {
        overflow-x: auto;
      }

      .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
      }
    }

    /* taskList-specific styling */
    ul[data-type='taskList'] {
      list-style: none;
      padding: 0;

      p {
        margin: 0;
      }

      li {
        display: flex;

        > label {
          flex: 0 0 auto;
          margin-right: 8px;
          user-select: none;
        }

        > div {
          flex: 1 1 auto;
        }
      }
    }
  }
}
</style>
