<template>
  <!-- 清除格式 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleClearMarks"><fz-icon name="format-clear" /></button>
    <template #content>
      <div>清除格式</div>
    </template>
  </fz-tooltip>
  <!-- 清除节点 -->
  <!-- <button class="command-button" @click="handleClearNodes"><fz-icon name="italic" />clear nodes</button> -->
  <!-- 粗体 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleToggleBold" :class="{ 'is-active': editor.isActive('bold') }"><fz-icon name="bold" /></button>
    <template #content>
      <div>粗体</div>
      <div>⌘ B</div>
    </template>
  </fz-tooltip>
  <!-- 斜体 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleToggleItalic" :class="{ 'is-active': editor.isActive('italic') }"><fz-icon name="italic" /></button>
    <template #content>
      <div>斜体</div>
      <div>⌘ I</div>
    </template>
  </fz-tooltip>
  <!-- 删除线 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleToggleStrike" :class="{ 'is-active': editor.isActive('strike') }"><fz-icon name="strikethrough" /></button>
    <template #content>
      <div>删除线</div>
      <div>⌘ ⇧ X</div>
    </template>
  </fz-tooltip>
  <!-- 高亮 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleToggleHighlight" :class="{ 'is-active': editor.isActive('highlight') }"><fz-icon name="pin" /></button>
    <template #content>
      <div>高亮</div>
      <div>⌘ ⇧ H</div>
    </template>
  </fz-tooltip>
  <!-- 行内代码 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleToggleCode" :class="{ 'is-active': editor.isActive('code') }"><fz-icon name="code" /></button>
    <template #content>
      <div>行内代码</div>
    </template>
  </fz-tooltip>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import { Icon, Tooltip } from '@fzui/components';
import { FZ_RICH_EDITOR_INSTANCE_INJECT_KEY } from '@fzui/constants';
import { Editor } from '@tiptap/vue-3';

export default defineComponent({
  name: 'MarksMenus',
  components: { FzIcon: Icon, FzTooltip: Tooltip },
  setup() {
    const editor = inject<Ref<Editor>>(FZ_RICH_EDITOR_INSTANCE_INJECT_KEY)!;

    const handleToggleBold = () => {
      // 切换 加粗
      editor.value.chain().focus().toggleBold().run();
    };

    const handleToggleItalic = () => {
      // 切换 斜体
      editor.value.chain().focus().toggleItalic().run();
    };

    const handleToggleStrike = () => {
      // 切换 删除线
      editor.value.chain().focus().toggleStrike().run();
    };

    const handleToggleHighlight = () => {
      editor.value.chain().focus().toggleHighlight().run();
    };

    const handleToggleCode = () => {
      // 切换 代码段
      editor.value.chain().focus().toggleCode().run();
    };

    const handleClearMarks = () => {
      // 取消所有标记样式
      editor.value.chain().focus().unsetAllMarks().run();
    };

    const handleClearNodes = () => {
      // 取消节点
      editor.value.chain().focus().clearNodes().run();
    };

    return {
      editor,

      handleToggleBold,
      handleToggleItalic,
      handleToggleStrike,
      handleToggleHighlight,
      handleToggleCode,
      handleClearMarks,
      handleClearNodes,
    };
  },
});
</script>
