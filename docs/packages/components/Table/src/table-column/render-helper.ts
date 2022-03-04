import { getCurrentInstance, h, ref, computed, watchEffect, unref } from 'vue';
import { debugWarn } from '@fzui/utils';
import { cellForced, defaultRenderCell, treeCellPrefix, getDefaultClassName } from '../table-utils/config';
import { parseWidth, parseMinWidth } from '../table-utils/util';

import type { ComputedRef } from 'vue';
import type { TableColumnCtx, TableColumn } from './defaults';

function useRender<T>(props: TableColumnCtx<T> & any, slots: any, owner: ComputedRef<any>) {
  const instance = getCurrentInstance() as TableColumn<T>;
  const columnId = ref('');
  const isSubColumn = ref(false);
  const realAlign = ref<string | null>();
  const realHeaderAlign = ref<string | null>();
  // const ns = useNamespace('table');
  watchEffect(() => {
    realAlign.value = props.align ? `is-${props.align}` : null;
    // nextline help render
    realAlign.value;
  });
  watchEffect(() => {
    realHeaderAlign.value = props.headerAlign ? `is-${props.headerAlign}` : realAlign.value;
    // nextline help render
    realHeaderAlign.value;
  });
  const columnOrTableParent = computed(() => {
    let parent: any = instance.vnode.vParent || instance.parent;
    while (parent && !parent.tableId && !parent.columnId) {
      parent = parent.vnode.vParent || parent.parent;
    }
    return parent;
  });

  const realWidth = ref(parseWidth(props.width));
  const realMinWidth = ref(parseMinWidth(props.minWidth));
  const setColumnWidth = (column: TableColumnCtx<T>) => {
    if (realWidth.value) {
      column.width = realWidth.value;
    }
    if (realMinWidth.value) {
      column.minWidth = realMinWidth.value;
    }
    if (!column.minWidth) {
      column.minWidth = 80;
    }
    column.realWidth = Number(column.width === undefined ? column.minWidth : column.width);
    return column;
  };
  const setColumnForcedProps = (column: TableColumnCtx<T> & any) => {
    // 对于特定类型的 column，某些属性不允许设置
    const type = column.type;
    const source = (cellForced as any)[type] || {};
    Object.keys(source).forEach((prop) => {
      const value = source[prop];
      if (prop !== 'className' && value !== undefined) {
        column[prop] = value;
      }
    });
    const className = getDefaultClassName(type);
    if (className) {
      const forceClass = `fz-${className}`;
      column.className = column.className ? `${column.className} ${forceClass}` : forceClass;
    }
    return column;
  };

  const checkSubColumn = (children: TableColumn<T> | TableColumn<T>[]) => {
    if (children instanceof Array) {
      children.forEach((child) => check(child));
    } else {
      check(children);
    }
    function check(item: TableColumn<T>) {
      if (item?.type?.name === 'ElTableColumn') {
        item.vParent = instance;
      }
    }
  };
  const setColumnRenders = (column: TableColumnCtx<T>) => {
    // renderHeader 属性不推荐使用。
    if (props.renderHeader !== undefined) {
      debugWarn('TableColumn', 'Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.');
      return;
    }

    if (column.type !== 'selection') {
      column.renderHeader = (scope) => {
        // help render
        instance.columnConfig.value['label'];
        const renderHeader = slots.header;
        return renderHeader ? renderHeader(scope) : column.label;
      };
    }

    let originRenderCell = column.renderCell;
    // TODO: 这里的实现调整
    if (column.type === 'expand') {
      // 对于展开行，renderCell 不允许配置的。在上一步中已经设置过，这里需要简单封装一下。
      column.renderCell = (data) =>
        h(
          'div',
          {
            class: 'cell',
          },
          [originRenderCell(data)],
        );
      owner.value.renderExpanded = (data: any) => {
        return slots.default ? slots.default(data) : slots.default;
      };
    } else {
      originRenderCell = originRenderCell || defaultRenderCell;
      // 对 renderCell 进行包装
      column.renderCell = (data) => {
        let children = null;
        if (slots.default) {
          children = slots.default(data);
        } else {
          children = originRenderCell(data);
        }
        const prefix = treeCellPrefix(data);
        const props = {
          class: 'cell',
          style: {},
        };
        if (column.showOverflowTooltip) {
          props.class = `${props.class} fz-tooltip`;
          props.style = {
            width: `${(data.column.realWidth || Number(data.column.width)) - 1}px`,
          };
        }
        checkSubColumn(children);
        return h('div', props, [prefix, children]);
      };
    }
    return column;
  };
  const getPropsData = (...propsKey: any[]) => {
    return propsKey.reduce((prev, cur) => {
      if (Array.isArray(cur)) {
        cur.forEach((key) => {
          prev[key] = props[key];
        });
      }
      return prev;
    }, {});
  };
  const getColumnElIndex = (children: any[], child: any) => {
    // eslint-disable-next-line prefer-reflect
    return [].indexOf.call(children, child as never);
  };

  return {
    columnId,
    realAlign,
    isSubColumn,
    realHeaderAlign,
    columnOrTableParent,
    setColumnWidth,
    setColumnForcedProps,
    setColumnRenders,
    getPropsData,
    getColumnElIndex,
  };
}

export default useRender;
