import { defineComponent, getCurrentInstance, onMounted, nextTick, ref, h, inject } from 'vue';
import FilterPanel from '../table-utils/filter-panel.vue';
import useLayoutObserver from '../table-utils/layout-observer';
import useEvent from './event-helper';
import useStyle from './style.helper';
import useUtils from './utils-helper';
import type { ComponentInternalInstance, Ref, PropType } from 'vue';
import type { DefaultRow, Sort } from '../Table';
import type { Store } from '../table-store';
import { FZ_TABLE_INJECT_KEY } from '@fzui/constants';
export interface TableHeader extends ComponentInternalInstance {
  state: {
    onColumnsChange: any;
    onScrollableChange: any;
  };
  filterPanels: Ref<any>;
}
export interface TableHeaderProps<T> {
  fixed: string;
  store: Store<T>;
  border: boolean;
  defaultSort: Sort;
}

export default defineComponent({
  name: 'FzTableHeader',
  props: {
    fixed: {
      type: String,
      default: '',
    },
    store: {
      required: true,
      type: Object as PropType<TableHeaderProps<DefaultRow>['store']>,
    },
    border: Boolean,
    defaultSort: {
      type: Object as PropType<TableHeaderProps<DefaultRow>['defaultSort']>,
      default: () => {
        return {
          prop: '',
          order: '',
        };
      },
    },
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance() as TableHeader;
    const parent = inject<any>(FZ_TABLE_INJECT_KEY)!;
    const filterPanels = ref({});
    const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent);
    onMounted(() => {
      nextTick(() => {
        const { prop, order } = props.defaultSort;
        const init = true;
        parent?.store.commit('sort', { prop, order, init });
      });
    });
    const { handleHeaderClick, handleHeaderContextMenu, handleMouseDown, handleMouseMove, handleMouseOut, handleSortClick, handleFilterClick } = useEvent(
      props as TableHeaderProps<unknown>,
      emit,
    );
    const { getHeaderRowStyle, getHeaderRowClass, getHeaderCellStyle, getHeaderCellClass } = useStyle(props as TableHeaderProps<unknown>);
    const { isGroup, toggleAllSelection, columnRows } = useUtils(props as TableHeaderProps<unknown>);

    instance.state = {
      onColumnsChange,
      onScrollableChange,
    };
    // eslint-disable-next-line
    instance.filterPanels = filterPanels;

    return {
      filterPanels,
      onColumnsChange,
      onScrollableChange,
      columnRows,
      getHeaderRowClass,
      getHeaderRowStyle,
      getHeaderCellClass,
      getHeaderCellStyle,
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleMouseOut,
      handleSortClick,
      handleFilterClick,
      isGroup,
      toggleAllSelection,
    };
  },
  render() {
    const {
      isGroup,
      columnRows,
      getHeaderCellStyle,
      getHeaderCellClass,
      getHeaderRowClass,
      getHeaderRowStyle,
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleSortClick,
      handleMouseOut,
      store,
      $parent,
    } = this;
    let rowSpan = 1;
    return h(
      'thead',
      {
        class: { 'is-group': isGroup },
      },
      columnRows.map((subColumns, rowIndex) =>
        h(
          'tr',
          {
            class: getHeaderRowClass(rowIndex),
            key: rowIndex,
            style: getHeaderRowStyle(rowIndex),
          },
          (subColumns as any).map((column: any, cellIndex: number) => {
            if (column.rowSpan > rowSpan) {
              rowSpan = column.rowSpan;
            }
            return h(
              'th',
              {
                class: getHeaderCellClass(rowIndex, cellIndex, subColumns, column),
                colspan: column.colSpan,
                key: `${column.id}-thead`,
                rowspan: column.rowSpan,
                style: getHeaderCellStyle(rowIndex, cellIndex, subColumns, column),
                onClick: ($event: any) => handleHeaderClick($event, column),
                onContextmenu: ($event: any) => handleHeaderContextMenu($event, column),
                onMousedown: ($event: any) => handleMouseDown($event, column),
                onMousemove: ($event: any) => handleMouseMove($event, column),
                onMouseout: handleMouseOut,
              },
              [
                h(
                  'div',
                  {
                    class: ['cell', column.filteredValue && column.filteredValue.length > 0 ? 'highlight' : '', column.labelClassName],
                  },
                  [
                    column.renderHeader
                      ? column.renderHeader({
                          column,
                          $index: cellIndex,
                          store,
                          _self: $parent,
                        })
                      : column.label,
                    column.sortable &&
                      h(
                        'span',
                        {
                          onClick: ($event: any) => handleSortClick($event, column, false),
                          class: 'caret-wrapper',
                        },
                        [
                          h('i', {
                            onClick: ($event: any) => handleSortClick($event, column, 'ascending'),
                            class: 'sort-caret ascending',
                          }),
                          h('i', {
                            onClick: ($event: any) => handleSortClick($event, column, 'descending'),
                            class: 'sort-caret descending',
                          }),
                        ],
                      ),
                    column.filterable &&
                      h(FilterPanel, {
                        store: ($parent! as any).store as any,
                        placement: column.filterPlacement || 'bottom-start',
                        column,
                        upDataColumn: (key: any, value: any) => {
                          column[key] = value;
                        },
                      }),
                  ],
                ),
              ],
            );
          }),
        ),
      ),
    );
  },
});
