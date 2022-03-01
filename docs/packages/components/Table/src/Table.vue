<template>
  <div
    ref="tableWrapper"
    :class="[
      `fz-table--${tableSize}`,
      'fz-table',
      className,
      `fz-table--layout-${tableLayout}`,
      {
        'fz-table--fit': fit,
        'fz-table--striped': stripe,
        'fz-table--border': border || isGroup,
        'fz-table--hidden': isHidden,
        'fz-table--group': isGroup,
        'fz-table--fluid-height': maxHeight,
        'fz-table--scrollable-x': layout.scrollX.value,
        'fz-table--scrollable-y': layout.scrollY.value,
        'fz-table--enable-row-hover': !store.states.isComplex.value,
        'fz-table--enable-row-transition': (store.states.data.value || []).length !== 0 && (store.states.data.value || []).length < 100,
        'has-footer': showSummary,
      },
    ]"
    :style="style"
    data-prefix="fz"
    @mouseleave="handleMouseLeave()"
  >
    <div class="fz-table__inner-wrapper">
      <div ref="hiddenColumns" class="hidden-columns">
        <slot></slot>
      </div>
      <div v-if="showHeader && tableLayout === 'fixed'" ref="headerWrapper" v-mousewheel="handleHeaderFooterMousewheel" class="fz-table__header-wrapper">
        <table ref="tableHeader" class="fz-table__header" :style="tableBodyStyles" border="0" cellpadding="0" cellspacing="0">
          <hColgroup :columns="store.states.columns.value" :table-layout="tableLayout"></hColgroup>
          <table-header :border="border" :default-sort="defaultSort" :store="store" @set-drag-visible="setDragVisible" />
        </table>
      </div>
      <div ref="bodyWrapper" :style="bodyHeight" class="fz-table__body-wrapper">
        <fz-scrollbar ref="scrollWrapper" :height="maxHeight ? undefined : height" :max-height="maxHeight ? height : undefined">
          <table
            ref="tableBody"
            class="fz-table__body"
            cellspacing="0"
            cellpadding="0"
            border="0"
            :style="{
              width: bodyWidth,
              tableLayout,
            }"
          >
            <hColgroup :columns="store.states.columns.value" :table-layout="tableLayout"></hColgroup>
            <table-header
              v-if="showHeader && tableLayout === 'auto'"
              :border="border"
              :default-sort="defaultSort"
              :store="store"
              @set-drag-visible="setDragVisible"
            />
            <table-body
              :context="context"
              :highlight="highlightCurrentRow"
              :row-class-name="rowClassName"
              :tooltip-effect="tooltipEffect"
              :row-style="rowStyle"
              :store="store"
              :stripe="stripe"
            />
          </table>
          <div v-if="isEmpty" ref="emptyBlock" :style="emptyBlockStyle" class="fz-table__empty-block">
            <span class="fz-table__empty-text">
              <slot name="empty">{{ computedEmptyText }}</slot>
            </span>
          </div>
          <div v-if="$slots.append" ref="appendWrapper" class="fz-table__append-wrapper">
            <slot name="append"></slot>
          </div>
        </fz-scrollbar>
      </div>
      <div v-if="border || isGroup" class="fz-table__border-left-patch"></div>
    </div>
    <div v-if="showSummary" v-show="!isEmpty" ref="footerWrapper" v-mousewheel="handleHeaderFooterMousewheel" class="fz-table__footer-wrapper">
      <table-footer
        :border="border"
        :default-sort="defaultSort"
        :store="store"
        :style="tableBodyStyles"
        :sum-text="computedSumText"
        :summary-method="summaryMethod"
      />
    </div>
    <div v-show="resizeProxyVisible" ref="resizeProxy" class="fz-table__column-resize-proxy"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, provide } from 'vue';
import { debounce } from '@fzui/utils';
import { Mousewheel } from '@fzui/directives';
import { useLocale } from '@fzui/hooks';
import { Scrollbar } from '@fzui/components/Scrollbar';
import { FZ_TABLE_INJECT_KEY } from '@fzui/constants';
import { createStore } from './table-store/helper';
import TableLayout from './table-utils/table-layout';
import TableHeader from './table-header';
import TableBody from './table-body';
import TableFooter from './table-footer';
import useUtils from './table-utils/utils-helper';
import useStyle from './table-utils/style-helper';
import { tableEmits, tableProps } from './Table';
import { hColgroup } from './table-utils/h-helper';

import type { Table } from './Table';

let tableIdSeed = 1;
export default defineComponent({
  name: 'FzTable',
  directives: {
    Mousewheel,
  },
  components: {
    TableHeader,
    TableBody,
    TableFooter,
    FzScrollbar: Scrollbar,
    hColgroup,
  },
  props: tableProps,
  emits: tableEmits,
  setup(props) {
    type Row = typeof props.data[number];
    const { t } = useLocale();
    // const ns = useNamespace('table');
    const table = getCurrentInstance() as Table<Row>;
    provide(FZ_TABLE_INJECT_KEY, table);
    const store = createStore<Row>(table, props);
    table.store = store;
    const layout = new TableLayout<Row>({
      store: table.store,
      table,
      fit: props.fit,
      showHeader: props.showHeader,
    });
    table.layout = layout;

    const isEmpty = computed(() => (store.states.data.value || []).length === 0);

    /**
     * open functions
     */
    const { setCurrentRow, toggleRowSelection, clearSelection, clearFilter, toggleAllSelection, toggleRowExpansion, clearSort, sort } = useUtils<Row>(store);
    const {
      isHidden,
      renderExpanded,
      setDragVisible,
      isGroup,
      handleMouseLeave,
      handleHeaderFooterMousewheel,
      tableSize,
      bodyHeight,
      height,
      emptyBlockStyle,
      handleFixedMousewheel,
      fixedHeight,
      fixedBodyHeight,
      resizeProxyVisible,
      bodyWidth,
      resizeState,
      doLayout,
      tableBodyStyles,
      tableLayout,
    } = useStyle<Row>(props, layout, store, table);

    const debouncedUpdateLayout = debounce(doLayout, 50);

    const tableId = `fz-table_${tableIdSeed++}`;
    table.tableId = tableId;
    table.state = {
      isGroup,
      resizeState,
      doLayout,
      debouncedUpdateLayout,
    };
    const computedSumText = computed(() => props.sumText || t('fz.table.sumText'));

    const computedEmptyText = computed(() => {
      return props.emptyText || t('fz.table.emptyText');
    });

    return {
      layout,
      store,
      handleHeaderFooterMousewheel,
      handleMouseLeave,
      tableId,
      tableSize,
      isHidden,
      isEmpty,
      renderExpanded,
      resizeProxyVisible,
      resizeState,
      isGroup,
      bodyWidth,
      bodyHeight,
      height,
      tableBodyStyles,
      emptyBlockStyle,
      debouncedUpdateLayout,
      handleFixedMousewheel,
      fixedHeight,
      fixedBodyHeight,
      setCurrentRow,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      doLayout,
      sort,
      t,
      setDragVisible,
      context: table,
      computedSumText,
      computedEmptyText,
      tableLayout,
    };
  },
});
</script>
