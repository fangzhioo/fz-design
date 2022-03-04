import { inject } from 'vue';
import { getFixedColumnOffset, getFixedColumnsClass, ensurePosition } from '../table-utils/util';
import type { TableColumnCtx } from '../table-column/defaults';
import type { TableBodyProps } from './TableBody';
import { FZ_TABLE_INJECT_KEY } from '@fzui/constants';

function useStyles<T>(props: Partial<TableBodyProps<T>>) {
  const parent = inject<any>(FZ_TABLE_INJECT_KEY);
  // const ns = useNamespace('table');

  const getRowStyle = (row: T, rowIndex: number) => {
    const rowStyle = parent?.props.rowStyle;
    if (typeof rowStyle === 'function') {
      return Reflect.apply(rowStyle, null, [{ row, rowIndex }]);
    }
    return rowStyle || null;
  };

  const getRowClass = (row: T, rowIndex: number) => {
    const classes = ['fz-table__row'];
    if (parent?.props.highlightCurrentRow && row === props.store.states.currentRow.value) {
      classes.push('current-row');
    }

    if (props.stripe && rowIndex % 2 === 1) {
      classes.push('fz-table__row--striped');
    }
    const rowClassName = parent?.props.rowClassName;
    if (typeof rowClassName === 'string') {
      classes.push(rowClassName);
    } else if (typeof rowClassName === 'function') {
      const clazz = Reflect.apply(rowClassName, null, [{ row, rowIndex }]);
      classes.push(clazz);
    }

    if (props.store.states.expandRows.value.indexOf(row) > -1) {
      classes.push('expanded');
    }

    return classes;
  };

  const getCellStyle = (rowIndex: number, columnIndex: number, row: T, column: TableColumnCtx<T>) => {
    const cellStyle = parent?.props.cellStyle;
    let cellStyles = cellStyle ?? {};
    if (typeof cellStyle === 'function') {
      cellStyles = Reflect.apply(cellStyle, null, [
        {
          rowIndex,
          columnIndex,
          row,
          column,
        },
      ]);
    }
    const fixedStyle = column.isSubColumn ? null : getFixedColumnOffset(columnIndex, props?.fixed === undefined ? false : props?.fixed, props.store);
    ensurePosition(fixedStyle, 'left');
    ensurePosition(fixedStyle, 'right');
    return Object.assign({}, cellStyles, fixedStyle);
  };

  const getCellClass = (rowIndex: number, columnIndex: number, row: T, column: TableColumnCtx<T>) => {
    const fixedClasses = column.isSubColumn
      ? []
      : getFixedColumnsClass('fz-table', columnIndex, props?.fixed === undefined ? false : props?.fixed, props.store);
    const classes = [column.id, column.align, column.className, ...fixedClasses];
    const cellClassName = parent?.props.cellClassName;
    if (typeof cellClassName === 'string') {
      classes.push(cellClassName);
    } else if (typeof cellClassName === 'function') {
      const cellClazz = Reflect.apply(cellClassName, null, [
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
  const getSpan = (row: T, column: TableColumnCtx<T>, rowIndex: number, columnIndex: number) => {
    let rowspan = 1;
    let colspan = 1;
    const fn = parent?.props.spanMethod;
    if (typeof fn === 'function') {
      const result = fn({
        row,
        column,
        rowIndex,
        columnIndex,
      });
      if (Array.isArray(result)) {
        rowspan = result[0];
        colspan = result[1];
      } else if (typeof result === 'object') {
        rowspan = result.rowspan;
        colspan = result.colspan;
      }
    }
    return { rowspan, colspan };
  };
  const getColspanRealWidth = (columns: TableColumnCtx<T>[], colspan: number, index: number): number => {
    if (colspan < 1) {
      return columns[index].realWidth;
    }
    const widthArr = columns.map(({ realWidth, width }) => realWidth || width).slice(index, index + colspan);
    return Number(widthArr.reduce((acc, width) => Number(acc) + Number(width), -1));
  };

  return {
    getRowStyle,
    getRowClass,
    getCellStyle,
    getCellClass,
    getSpan,
    getColspanRealWidth,
  };
}

export default useStyles;
