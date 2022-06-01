<template>
  <div>
    <fz-rich-editor v-model="content">
      <template #menus="{ editor }">
        <div class="my-custom-menus">
          <!-- 粗体 -->
          <button class="action-button" @click="handleToggleBold(editor)" :class="{ 'is-active': editor.isActive('bold') }">
            <fz-icon name="bold" />
          </button>

          <!-- 斜体 -->
          <button class="action-button" @click="handleToggleItalic(editor)" :class="{ 'is-active': editor.isActive('italic') }">
            <fz-icon name="italic" />
          </button>

          <!-- 删除线 -->
          <button class="action-button" @click="handleToggleStrike(editor)" :class="{ 'is-active': editor.isActive('strike') }">
            <fz-icon name="strikethrough" />
          </button>
        </div>
      </template>
    </fz-rich-editor>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Editor } from '@fzui/components';

const content = ref(`
  <h2>
    Hi there,
  </h2>
  <p>
    this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul>
    <li>
      That’s a bullet list with one …
    </li>
    <li>
      … or two list items.
    </li>
  </ul>
`);

const handleToggleBold = (editor: Editor) => {
  editor.chain().focus().toggleBold().run();
};

const handleToggleItalic = (editor: Editor) => {
  editor.chain().focus().toggleItalic().run();
};

const handleToggleStrike = (editor: Editor) => {
  editor.chain().focus().toggleStrike().run();
};
</script>

<style scoped lang="less">
.my-custom-menus {
  background-color: antiquewhite;
  padding: 6px;

  .action-button {
    font-size: inherit;
    font-family: inherit;
    color: var(--fz-color-black, #333);
    margin: 4px;
    border-radius: 4px;
    padding: 2px 6px;
    background-color: var(--fz-color-white, #fff);
    accent-color: var(--fz-color-black, #333);
    border: none;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      background-color: var(--fz-fill-color-lighter, #dcdfe6);
    }

    &[disabled] {
      opacity: 0.3;
    }

    &.is-active {
      background-color: var(--fz-color-black, #333);
      color: var(--fz-color-white, #fff);
    }
  }
}
</style>
