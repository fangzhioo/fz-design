import { inject } from 'vue';
import { getFixedColumnsClass, getFixedColumnOffset, ensurePosition } from '../table-utils/util';
import type { TableColumnCtx } from '../table-column/defaults';
import type { TableHeaderProps } from '.';
import { FZ_TABLE_INJECT_KEY } from '@fzui/constants';

function useStyle<T>(props: TableHeaderProps<T>) {
  const parent = inject<any>(FZ_TABLE_INJECT_KEY)!;

  const getHeaderRowStyle = (rowIndex: number) => {
    const headerRowStyle = parent?.props.headerRowStyle;
    if (typeof headerRowStyle === 'function') {
      return Reflect.apply(headerRowStyle, null, [{ rowIndex }]);
      // return headerRowStyle({ rowIndex });
    }
    return headerRowStyle;
  };

  const getHeaderRowClass = (rowIndex: number): string => {
    const classes: string[] = [];
    const headerRowClassName = parent?.props.headerRowClassName;
    if (typeof headerRowClassName === 'string') {
      classes.push(headerRowClassName);
    } else if (typeof headerRowClassName === 'function') {
      const rowClazz = Reflect.apply(headerRowClassName, null, [{ rowIndex }]);
      classes.push(rowClazz);
    }

    return classes.join(' ');
  };

  const getHeaderCellStyle = (rowIndex: number, columnIndex: number, row: T, column: TableColumnCtx<T>) => {
    let headerCellStyles = parent?.props.headerCellStyle ?? {};
    if (typeof headerCellStyles === 'function') {
      headerCellStyles = Reflect.apply(headerCellStyles, null, [
        {
          rowIndex,
          columnIndex,
          row,
          column,
        },
      ]);
      // headerCellStyles = headerCellStyles.call(null,{
      //   rowIndex,
      //   columnIndex,
      //   row,
      //   column,
      // });
    }
    const fixedStyle = column.isSubColumn ? null : getFixedColumnOffset<T>(columnIndex, column.fixed, props.store, row as unknown as TableColumnCtx<T>[]);
    ensurePosition(fixedStyle, 'left');
    ensurePosition(fixedStyle, 'right');
    return Object.assign({}, headerCellStyles, fixedStyle);
  };

  const getHeaderCellClass = (rowIndex: number, columnIndex: number, row: T, column: TableColumnCtx<T>) => {
    const fixedClasses = column.isSubColumn
      ? []
      : getFixedColumnsClass<T>('fz-table', columnIndex, column.fixed, props.store, row as unknown as TableColumnCtx<T>[]);
    const classes = [column.id, column.order, column.headerAlign, column.className, column.labelClassName, ...fixedClasses];

    if (!column.children) {
      classes.push('is-leaf');
    }

    if (column.sortable) {
      classes.push('is-sortable');
    }

    const headerCellClassName = parent?.props.headerCellClassName;
    if (typeof headerCellClassName === 'string') {
      classes.push(headerCellClassName);
    } else if (typeof headerCellClassName === 'function') {
      const cellClazz = Reflect.apply(headerCellClassName, null, [
        {
          rowIndex,
          columnIndex,
          row,
          column,
        },
      ]);
      classes.push(cellClazz);
    }

    classes.push('fz-table__cell');

    return classes.join(' ');
  };

  return {
    getHeaderRowStyle,
    getHeaderRowClass,
    getHeaderCellStyle,
    getHeaderCellClass,
  };
}

export default useStyle;
