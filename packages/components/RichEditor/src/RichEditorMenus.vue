<template>
  <div class="fz-rich-editor__menus" v-if="editor">
    <history-menus />
    <heading-paragraph-menus />
    <marks-menus />
    <list-menus />
    <base-menus />
    <text-align-menus v-if="options.textAlign !== false" />
    <table-menus v-if="options.table !== false" />
    <image-menus :options="options.image" v-if="options.image !== false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import { FZ_RICH_EDITOR_INSTANCE_INJECT_KEY } from '@fzui/constants';
import { Editor } from '@tiptap/vue-3';
import BaseMenus from './menus/BaseMenus.vue';
import MarksMenus from './menus/MarksMenus.vue';
import ListMenus from './menus/ListMenus.vue';
import TableMenus from './menus/TableMenus.vue';
import ImageMenus from './menus/ImageMenus.vue';
import HistoryMenus from './menus/HistoryMenus.vue';
import HeadingParagraphMenus from './menus/HeadingParagraphMenus.vue';
import TextAlignMenus from './menus/TextAlignMenus.vue';
import { richEditorMenusProps } from './RichEditor';

export default defineComponent({
  name: 'FzRichEditorMenus',
  components: { BaseMenus, MarksMenus, ListMenus, TableMenus, ImageMenus, TextAlignMenus, HistoryMenus, HeadingParagraphMenus },
  props: richEditorMenusProps,
  setup() {
    const editor = inject<Ref<Editor>>(FZ_RICH_EDITOR_INSTANCE_INJECT_KEY)!;

    return {
      editor,
    };
  },
});
</script>

<style lang="less">
.fz-rich-editor__menus {
  // ...
  background-color: var(--fz-color-white, #fff);
  border-bottom: 0;
  border-bottom: 1px solid var(--fz-border-color-lighter, #ebeef5);
  margin-bottom: 10px;
  display: inline-flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  padding: 6px 4px;
  position: relative;
  font-size: 16px;

  .command-button {
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
      background-color: var(--fz-background-color-lighter, #dcdfe6);
    }

    &[disabled] {
      opacity: 0.3;
    }

    &.is-active {
      background-color: var(--fz-color-black, #333);
      color: var(--fz-color-white, #fff);
    }

    .more-actions {
      .more-icon {
        font-size: 10px;
        color: #999;
        margin-left: 4px;
        vertical-align: middle;
      }
    }
  }
}
.fz-rich-editor__menus--popover-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .fz-rich-editor__menus--popover-list-item {
    width: 100%;
    padding: 6px 10px;
    cursor: pointer;
    &:hover {
      background-color: var(--fz-background-color-light, #dcdfe6);
    }

    &.is-active {
      background-color: var(--fz-background-color-lighter, #c0c4cc);
    }

    & > .fz-icon {
      margin-right: 4px;
    }

    &.fz-rich-editor__menus--paragraph {
      color: #333;
    }
    &.fz-rich-editor__menus--heading-1 {
      font-weight: 600;
      font-size: 32px;
    }
    &.fz-rich-editor__menus--heading-2 {
      font-weight: 600;
      font-size: 24px;
    }
    &.fz-rich-editor__menus--heading-3 {
      font-weight: 600;
      font-size: 20px;
    }
    &.fz-rich-editor__menus--heading-4 {
      font-weight: 600;
      font-size: 16px;
    }
    &.fz-rich-editor__menus--heading-5 {
      font-weight: 600;
      font-size: 14px;
    }
    &.fz-rich-editor__menus--heading-6 {
      font-weight: 600;
      font-size: 13.6px;
      color: var(--fz-text-color-regular, #606266);
    }
  }
  .command-button {
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
      background-color: var(--fz-background-color-lighter, #dcdfe6);
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
