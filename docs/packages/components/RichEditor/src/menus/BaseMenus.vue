<template>
  <!-- 代码块 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleToggleCodeBlock" :class="{ 'is-active': editor.isActive('codeBlock') }"><fz-icon name="code-view" /></button>
    <template #content>
      <div>代码块</div>
      <div>⌘ E</div>
    </template>
  </fz-tooltip>
  <!-- 引用 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleToggleBlockquote" :class="{ 'is-active': editor.isActive('blockquote') }">
      <fz-icon name="double-quotes-r" />
    </button>
    <template #content>
      <div>引用</div>
    </template>
  </fz-tooltip>
  <!-- 水平线 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleSetHorizontalRule"><fz-icon name="separator" /></button>
    <template #content>
      <div>水平线</div>
      <!-- <div>⌥ </div> -->
    </template>
  </fz-tooltip>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import { Icon, Tooltip } from '@fzui/components';
import { FZ_RICH_EDITOR_INSTANCE_INJECT_KEY } from '@fzui/constants';
import { Editor } from '@tiptap/vue-3';

export default defineComponent({
  name: 'BaseMenus',
  components: { FzIcon: Icon, FzTooltip: Tooltip },
  setup() {
    const editor = inject<Ref<Editor>>(FZ_RICH_EDITOR_INSTANCE_INJECT_KEY)!;

    const handleToggleCodeBlock = () => {
      // 切换 代码块
      editor.value.chain().focus().toggleCodeBlock().run();
    };

    const handleToggleBlockquote = () => {
      // 切换 引用块
      editor.value.chain().focus().toggleBlockquote().run();
    };

    const handleSetHorizontalRule = () => {
      // 设置 水平分割线
      editor.value.chain().focus().setHorizontalRule().run();
    };

    return {
      editor,

      handleToggleCodeBlock,
      handleToggleBlockquote,
      handleSetHorizontalRule,
    };
  },
});
</script>
