<template>
  <!-- 撤销 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleUnDo"><fz-icon name="back" /></button>
    <template #content>
      <div>撤销</div>
      <div>⌘ Z</div>
    </template>
  </fz-tooltip>
  <!-- 重做 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleReDo"><fz-icon name="forward" /></button>
    <template #content>
      <div>重做</div>
      <div>⌘ ⇧ Z</div>
    </template>
  </fz-tooltip>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import { Icon, Tooltip } from '@fzui/components';
import { FZ_RICH_EDITOR_INSTANCE_INJECT_KEY } from '@fzui/constants';
import { Editor } from '@tiptap/vue-3';

export default defineComponent({
  name: 'HistoryMenus',
  components: { FzIcon: Icon, FzTooltip: Tooltip },
  setup() {
    const editor = inject<Ref<Editor>>(FZ_RICH_EDITOR_INSTANCE_INJECT_KEY)!;

    const handleUnDo = () => {
      // 撤销还原
      editor.value.chain().focus().undo().run();
    };

    const handleReDo = () => {
      // 恢复
      editor.value.chain().focus().redo().run();
    };

    return {
      editor,

      handleUnDo,
      handleReDo,
    };
  },
});
</script>
