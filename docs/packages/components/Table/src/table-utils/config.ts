import { h } from 'vue';
import { Checkbox } from '@fzui/components/Checkbox';
import { Icon } from '@fzui/components/Icon';
import { get as getPropByPath } from '@fzui/utils';

import type { VNode } from 'vue';
import type { TableColumnCtx } from '../table-column/defaults';
import type { Store } from '../table-store';
import type { TreeNode } from '../Table';

const defaultClassNames: Record<string, any> = {
  selection: 'table-column--selection',
  expand: 'table__expand-column',
};

export const cellStarts: Record<string, any> = {
  default: {
    order: '',
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: '',
  },
};

export const getDefaultClassName = (type: string) => {
  return defaultClassNames[type] || '';
};

// 这些选项不应该被覆盖
export const cellForced = {
  selection: {
    renderHeader<T>({ store }: { store: Store<T> }) {
      function isDisabled() {
        return store.states.data.value && store.states.data.value.length === 0;
      }
      return h(Checkbox, {
        disabled: isDisabled(),
        size: store.states.tableSize.value,
        indeterminate: store.states.selection.value.length > 0 && !store.states.isAllSelected.value,
        'onUpdate:modelValue': store.toggleAllSelection,
        modelValue: store.states.isAllSelected.value,
      });
    },
    renderCell<T>({ row, column, store, $index }: { row: T; column: TableColumnCtx<T>; store: Store<T>; $index: number }) {
      return h(Checkbox, {
        disabled: column.selectable ? !column.selectable(row, $index) : false,
        size: store.states.tableSize.value,
        onChange: () => {
          store.commit('rowSelectedChanged', row);
        },
        onClick: (event: Event) => event.stopPropagation(),
        modelValue: store.isSelected(row),
      });
    },
    sortable: false,
    resizable: false,
  },
  index: {
    renderHeader<T>({ column }: { column: TableColumnCtx<T> }) {
      return column.label || '#';
    },
    renderCell<T>({ column, $index }: { column: TableColumnCtx<T>; $index: number }) {
      let i = $index + 1;
      const index = column.index;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }
      return h('div', {}, [i]);
    },
    sortable: false,
  },
  expand: {
    renderHeader<T>({ column }: { column: TableColumnCtx<T> }) {
      return column.label || '';
    },
    renderCell<T>({ row, store }: { row: T; store: Store<T> }) {
      const classes = ['fz-table__expand-icon'];
      if (store.states.expandRows.value.indexOf(row) > -1) {
        classes.push('fz-table__expand-icon--expanded');
      }
      const callback = (e: Event) => {
        e.stopPropagation();
        store.toggleRowExpansion(row);
      };
      return h(
        'div',
        {
          class: classes,
          onClick: callback,
        },
        {
          default: () => {
            return [h(Icon as any, { name: 'arrow-right-bold' }, undefined)];
          },
        },
      );
    },
    sortable: false,
    resizable: false,
  },
};

export function defaultRenderCell<T>({ row, column, $index }: { row: T; column: TableColumnCtx<T>; $index: number }) {
  const property = column.property;
  const value = property && getPropByPath(row, property, false);
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return value?.toString?.() || '';
}

export function treeCellPrefix<T>({ row, treeNode, store }: { row: T; treeNode: TreeNode; store: Store<T> }) {
  if (!treeNode) {
    return null;
  }
  const ele: VNode[] = [];
  const callback = (e: Event) => {
    e.stopPropagation();
    store.loadOrToggle(row);
  };
  if (treeNode.indent) {
    ele.push(
      h('span', {
        class: 'fz-table__indent',
        style: { 'padding-left': `${treeNode.indent}px` },
      }),
    );
  }
  if (typeof treeNode.expanded === 'boolean' && !treeNode.noLazyChildren) {
    const expandClasses = ['fz-table__expand-icon', treeNode.expanded ? 'fz-table__expand-icon--expanded' : ''];
    let icon = 'arrow-right-bold';
    if (treeNode.loading) {
      icon = 'loading';
    }

    ele.push(
      h(
        'div',
        {
          class: expandClasses,
          onClick: callback,
        },
        {
          default: () => {
            return [h(Icon as any, { class: { 'is-loading': treeNode.loading }, name: icon }, undefined)];
          },
        },
      ),
    );
  } else {
    ele.push(
      h('span', {
        class: 'fz-table__placeholder',
      }),
    );
  }
  return ele;
}
