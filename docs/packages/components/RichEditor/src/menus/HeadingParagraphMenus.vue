<template>
  <fz-popover trigger="click">
    <template #reference>
      <button class="command-button">
        <fz-tooltip effect="dark" placement="bottom">
          <span class="more-actions">
            <fz-icon :name="levelIcon" />
            <fz-icon class="more-icon" name="arrow-down-filling" />
          </span>
          <template #content>
            <div>正文和标题</div>
          </template>
        </fz-tooltip>
      </button>
    </template>
    <div class="fz-rich-editor__menus--popover-list">
      <!-- 文本 -->
      <div
        class="fz-rich-editor__menus--popover-list-item fz-rich-editor__menus--paragraph"
        @click="handleSetParagraph"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        <fz-icon name="text" />
        <span>正文</span>
      </div>
      <!-- 标题 -->
      <div
        v-for="level in headingList"
        :key="level"
        class="fz-rich-editor__menus--popover-list-item"
        @click="handleToggleHeading(1)"
        :class="[
          `fz-rich-editor__menus--heading-${level}`,
          {
            'is-active': editor.isActive('heading', { level }),
          },
        ]"
      >
        <fz-icon :name="`h-${level}`" />
        <span>标题{{ level }}</span>
      </div>
    </div>
  </fz-popover>
</template>
<script lang="ts">
import { defineComponent, inject, Ref, computed } from 'vue';
import { Icon, Tooltip, Popover } from '@fzui/components';
import { FZ_RICH_EDITOR_INSTANCE_INJECT_KEY } from '@fzui/constants';
import { Editor } from '@tiptap/vue-3';
import { Level } from '../extensions/HeadingParagraphExtension';

export default defineComponent({
  name: 'HeadingParagraphMenus',
  components: { FzIcon: Icon, FzTooltip: Tooltip, FzPopover: Popover },
  setup() {
    const headingList: Level[] = [1, 2, 3, 4, 5, 6];
    const editor = inject<Ref<Editor>>(FZ_RICH_EDITOR_INSTANCE_INJECT_KEY)!;
    const levelIcon = computed<string>(() => {
      if (editor.value.isActive('paragraph')) {
        return 'text';
      }
      if (editor.value.isActive('heading', { level: 1 })) {
        return 'h-1';
      }
      if (editor.value.isActive('heading', { level: 2 })) {
        return 'h-2';
      }
      if (editor.value.isActive('heading', { level: 3 })) {
        return 'h-3';
      }
      if (editor.value.isActive('heading', { level: 4 })) {
        return 'h-4';
      }
      if (editor.value.isActive('heading', { level: 5 })) {
        return 'h-5';
      }
      if (editor.value.isActive('heading', { level: 6 })) {
        return 'h-6';
      }
      return 'stop';
    });

    const handleSetParagraph = () => {
      // 设置正文
      editor.value.chain().focus().setParagraph().run();
    };

    const handleToggleHeading = (level: Level) => {
      // 切换 标题
      editor.value.chain().focus().toggleHeading({ level }).run();
    };

    return {
      headingList,
      editor,
      levelIcon,

      handleSetParagraph,
      handleToggleHeading,
    };
  },
});
</script>
