<template>
  <fz-popover trigger="click">
    <template #reference>
      <button class="command-button">
        <fz-tooltip effect="dark" placement="bottom">
          <span class="more-actions">
            <fz-icon :name="`align-${currentAlign}`" />
            <fz-icon class="more-icon" name="arrow-down-filling" />
          </span>
          <template #content>
            <div>文本对齐</div>
          </template>
        </fz-tooltip>
      </button>
    </template>
    <div class="fz-rich-editor__menus--popover-list">
      <!-- 左对齐 -->
      <fz-tooltip effect="dark" placement="bottom">
        <button class="command-button" @click="handleSetTextAlign('left')" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
          <fz-icon name="align-left" />
        </button>
        <template #content>
          <div>左对齐</div>
        </template>
      </fz-tooltip>
      <!-- 居中对齐 -->
      <fz-tooltip effect="dark" placement="bottom">
        <button class="command-button" @click="handleSetTextAlign('center')" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
          <fz-icon name="align-center" />
        </button>
        <template #content>
          <div>居中对齐</div>
        </template>
      </fz-tooltip>
      <!-- 右对齐 -->
      <fz-tooltip effect="dark" placement="bottom">
        <button class="command-button" @click="handleSetTextAlign('right')" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
          <fz-icon name="align-right" />
        </button>
        <template #content>
          <div>右对齐</div>
        </template>
      </fz-tooltip>
      <!-- 两端对齐 -->
      <fz-tooltip effect="dark" placement="bottom">
        <button class="command-button" @click="handleSetTextAlign('justify')" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
          <fz-icon name="align-justify" />
        </button>
        <template #content>
          <div>两端对齐</div>
        </template>
      </fz-tooltip>
    </div>
  </fz-popover>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, computed } from 'vue';
import { Editor } from '@tiptap/vue-3';
import { FZ_RICH_EDITOR_INSTANCE_INJECT_KEY } from '@fzui/constants';
import { Icon, Tooltip, Popover } from '@fzui/components';

type TextAlign = 'left' | 'center' | 'right' | 'justify';

export default defineComponent({
  name: 'TextAlignMenus',
  components: { FzIcon: Icon, FzTooltip: Tooltip, FzPopover: Popover },
  setup() {
    const editor = inject<Ref<Editor>>(FZ_RICH_EDITOR_INSTANCE_INJECT_KEY)!;
    const currentAlign = computed<TextAlign>(() => {
      if (editor.value.isActive({ textAlign: 'left' })) {
        return 'left';
      }
      if (editor.value.isActive({ textAlign: 'center' })) {
        return 'center';
      }
      if (editor.value.isActive({ textAlign: 'right' })) {
        return 'right';
      }
      if (editor.value.isActive({ textAlign: 'justify' })) {
        return 'justify';
      }
      return 'left';
    });

    const handleSetTextAlign = (align: TextAlign) => {
      editor.value.chain().focus().setTextAlign(align).run();
    };

    return {
      editor,
      currentAlign,

      handleSetTextAlign,
    };
  },
});
</script>
