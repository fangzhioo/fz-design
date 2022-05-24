<template>
  <div>
    <fz-rich-editor v-model="content" :extensions="extensions" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RichEditorExtension } from '@fzui/components';
import Placeholder from '@tiptap/extension-placeholder';

const extensions: RichEditorExtension[] = [
  Placeholder.configure({
    emptyEditorClass: 'is-editor-empty',
    emptyNodeClass: 'is-empty',
    // Use a placeholder:
    placeholder: 'Write something …',
    // Use different placeholders depending on the node type:
    // placeholder: ({ node }) => {
    //   if (node.type.name === 'heading') {
    //     return 'What’s the title?'
    //   }

    //   return 'Can you add some further context?'
    // },
  }),
];

const content = ref('');
</script>

<style>
/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
