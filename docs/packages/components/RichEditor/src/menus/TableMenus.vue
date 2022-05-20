<template>
  <!-- 插入表格 -->
  <fz-tooltip effect="dark" placement="bottom">
    <button class="command-button" @click="handleInsertTable"><fz-icon name="table-2" /></button>
    <template #content>
      <div>插入表格</div>
    </template>
  </fz-tooltip>
  <!-- 当前列之前插入一列 -->
  <fz-tooltip effect="dark" placement="bottom" v-if="editor.can().addColumnBefore()">
    <button class="command-button" @click="handleAddColumnBefore"><fz-icon name="insert-column-left" /></button>
    <template #content>
      <div>当前列之前插入一列</div>
    </template>
  </fz-tooltip>
  <!-- 当前列之后插入一列 -->
  <fz-tooltip effect="dark" placement="bottom" v-if="editor.can().addColumnAfter()">
    <button class="command-button" @click="handleAddColumnAfter"><fz-icon name="insert-column-right" /></button>
    <template #content>
      <div>当前列之后插入一列</div>
    </template>
  </fz-tooltip>
  <!-- 删除当前列 -->
  <fz-tooltip effect="dark" placement="bottom" v-if="editor.can().deleteColumn()">
    <button class="command-button" @click="handleDeleteColumn"><fz-icon name="delete-column" /></button>
    <template #content>
      <div>删除当前列</div>
    </template>
  </fz-tooltip>
  <!-- 当前行之前增加一行 -->
  <fz-tooltip effect="dark" placement="bottom" v-if="editor.can().addRowBefore()">
    <button class="command-button" @click="handleAddRowBefore"><fz-icon name="insert-row-top" /></button>
    <template #content>
      <div>当前行之前增加一行</div>
    </template>
  </fz-tooltip>
  <!-- 当前行之后增加一行 -->
  <fz-tooltip effect="dark" placement="bottom" v-if="editor.can().addRowAfter()">
    <button class="command-button" @click="handleAddRowAfter"><fz-icon name="insert-row-bottom" /></button>
    <template #content>
      <div>当前行之后增加一行</div>
    </template>
  </fz-tooltip>
  <!-- 删除当前行 -->
  <fz-tooltip effect="dark" placement="bottom" v-if="editor.can().deleteRow()">
    <button class="command-button" @click="handleDeleteRow"><fz-icon name="delete-row" /></button>
    <template #content>
      <div>删除当前行</div>
    </template>
  </fz-tooltip>
  <!-- 删除表格 -->
  <fz-tooltip effect="dark" placement="bottom" v-if="editor.can().deleteTable()">
    <button class="command-button" @click="handleDeleteTable"><fz-icon name="intermediate-filling" /></button>
    <template #content>
      <div>删除表格</div>
    </template>
  </fz-tooltip>

  <!-- 合并单元格 -->
  <fz-tooltip effect="dark" placement="bottom" v-if="editor.can().mergeCells()">
    <button class="command-button" @click="handleMergeCells"><fz-icon name="merge-cells-vertical" /></button>
    <template #content>
      <div>合并单元格</div>
    </template>
  </fz-tooltip>
  <!-- 拆分单元格 -->
  <fz-tooltip effect="dark" placement="bottom" v-if="editor.can().splitCell()">
    <button class="command-button" @click="handleSplitCell"><fz-icon name="split-cells-vertical" /></button>
    <template #content>
      <div>拆分单元格</div>
    </template>
  </fz-tooltip>

  <!-- <button @click="editor.chain().focus().toggleHeaderColumn().run()" :disabled="!editor.can().toggleHeaderColumn()">toggleHeaderColumn 切换行头</button>
    <button @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">toggleHeaderRow 切换列头</button>
    <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
      toggleHeaderCell 切换单元格为标题单元格
    </button>
    <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
      mergeOrSplit 切换合并和拆分（选择多个就合并，单个就拆分为2个）
    </button>
    <button
      @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()"
      :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')"
    >
      setCellAttribute 设置单元格属性
    </button>
    <button @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">fixTables 检查修复所有的表格</button>
    <button @click="editor.chain().focus().goToNextCell().run()" :disabled="!editor.can().goToNextCell()">goToNextCell 下一个单元格</button>
    <button @click="editor.chain().focus().goToPreviousCell().run()" :disabled="!editor.can().goToPreviousCell()">goToPreviousCell 上一个单元格</button> -->
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import { Editor } from '@tiptap/vue-3';
import { FZ_RICH_EDITOR_INSTANCE_INJECT_KEY } from '@fzui/constants';
import { Icon, Tooltip } from '@fzui/components';

export default defineComponent({
  name: 'TableMenus',
  components: { FzIcon: Icon, FzTooltip: Tooltip },
  setup() {
    const editor = inject<Ref<Editor>>(FZ_RICH_EDITOR_INSTANCE_INJECT_KEY)!;

    const handleInsertTable = () => {
      editor.value.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    const handleAddColumnBefore = () => {
      editor.value.chain().focus().addColumnBefore().run();
    };

    const handleAddColumnAfter = () => {
      editor.value.chain().focus().addColumnAfter().run();
    };

    const handleDeleteColumn = () => {
      editor.value.chain().focus().deleteColumn().run();
    };

    const handleAddRowBefore = () => {
      editor.value.chain().focus().addRowBefore().run();
    };

    const handleAddRowAfter = () => {
      editor.value.chain().focus().addRowAfter().run();
    };

    const handleDeleteRow = () => {
      editor.value.chain().focus().deleteRow().run();
    };

    const handleDeleteTable = () => {
      editor.value.chain().focus().deleteTable().run();
    };

    const handleMergeCells = () => {
      editor.value.chain().focus().mergeCells().run();
    };

    const handleSplitCell = () => {
      editor.value.chain().focus().splitCell().run();
    };

    return {
      editor,

      handleInsertTable,
      handleAddColumnBefore,
      handleAddColumnAfter,
      handleDeleteColumn,
      handleAddRowBefore,
      handleAddRowAfter,
      handleDeleteRow,
      handleDeleteTable,
      handleMergeCells,
      handleSplitCell,
    };
  },
});
</script>
