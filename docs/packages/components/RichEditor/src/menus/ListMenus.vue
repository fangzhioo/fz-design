<template>
  <!-- 无序列表 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handletTggleBulletList" :class="{ 'is-active': editor.isActive('bulletList') }">
      <fz-icon name="list-unordered" />
    </button>
    <template #content>
      <div>无序列表</div>
      <div>⌘ ⇧ 8</div>
    </template>
  </fz-tooltip>
  <!-- 有序列表 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleToggleOrderedList" :class="{ 'is-active': editor.isActive('orderedList') }">
      <fz-icon name="list-ordered" />
    </button>
    <template #content>
      <div>有序列表</div>
      <div>⌘ ⇧ 7</div>
    </template>
  </fz-tooltip>
  <!-- 待办列表 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleToggleTaskList" :class="{ 'is-active': editor.isActive('taskList') }">
      <fz-icon name="list-check" />
    </button>
    <template #content>
      <div>待办列表</div>
      <div>⌘ ⇧ 9</div>
    </template>
  </fz-tooltip>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import { Icon, Tooltip } from '@fzui/components';
import { FZ_RICH_EDITOR_INSTANCE_INJECT_KEY } from '@fzui/constants';
import { Editor } from '@tiptap/vue-3';

export default defineComponent({
  name: 'ListMenus',
  components: { FzIcon: Icon, FzTooltip: Tooltip },
  setup() {
    const editor = inject<Ref<Editor>>(FZ_RICH_EDITOR_INSTANCE_INJECT_KEY)!;
    const handletTggleBulletList = () => {
      // 切换 无序列表
      editor.value.chain().focus().toggleBulletList().run();
    };

    const handleToggleOrderedList = () => {
      // 切换 有序列表
      editor.value.chain().focus().toggleOrderedList().run();
    };

    const handleToggleTaskList = () => {
      editor.value.chain().focus().toggleTaskList().run();
    };

    return {
      editor,
      handletTggleBulletList,
      handleToggleOrderedList,
      handleToggleTaskList,
    };
  },
});
</script>
