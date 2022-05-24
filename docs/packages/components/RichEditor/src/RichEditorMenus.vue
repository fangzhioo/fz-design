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
