import { defineComponent, h } from 'vue';
import { hColgroup } from '../table-utils/h-helper';
import useStyle from './style-helper';
import type { Store } from '../table-store';

import type { PropType } from 'vue';
import type { DefaultRow, Sort, SummaryMethod } from '../Table';
export interface TableFooter<T> {
  fixed: string;
  store: Store<T>;
  summaryMethod: SummaryMethod<T>;
  sumText: string;
  border: boolean;
  defaultSort: Sort;
}

export default defineComponent({
  name: 'FzTableFooter',

  props: {
    fixed: {
      type: String,
      default: '',
    },
    store: {
      required: true,
      type: Object as PropType<TableFooter<DefaultRow>['store']>,
    },
    summaryMethod: Function as PropType<TableFooter<DefaultRow>['summaryMethod']>,
    sumText: String,
    border: Boolean,
    defaultSort: {
      type: Object as PropType<TableFooter<DefaultRow>['defaultSort']>,
      default: () => {
        return {
          prop: '',
          order: '',
        };
      },
    },
  },
  setup(props) {
    const { getCellClasses, getCellStyles, columns } = useStyle(props as TableFooter<DefaultRow>);
    // const ns = useNamespace('table');
    return {
      getCellClasses,
      getCellStyles,
      columns,
    };
  },
  render() {
    const { columns, getCellStyles, getCellClasses, summaryMethod, sumText } = this;
    const data: any[] = this.store.states.data.value;
    let sums: any[] = [];
    if (summaryMethod) {
      sums = summaryMethod({
        columns,
        data,
      });
    } else {
      columns.forEach((column: any, index: number) => {
        if (index === 0) {
          sums[index] = sumText;
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        const precisions: any[] = [];
        let notNumber = true;
        values.forEach((value) => {
          if (!isNaN(value)) {
            notNumber = false;
            const decimal = `${value}`.split('.')[1];
            precisions.push(decimal ? decimal.length : 0);
          }
        });
        // eslint-disable-next-line prefer-reflect
        const precision = Math.max.apply(null, precisions);
        if (!notNumber) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return parseFloat((prev + curr).toFixed(Math.min(precision, 20)));
            }
            return prev;
          }, 0);
        } else {
          sums[index] = '';
        }
      });
    }
    return h(
      'table',
      {
        class: 'fz-table__footer',
        cellspacing: '0',
        cellpadding: '0',
        border: '0',
      },
      [
        hColgroup({
          columns,
        }),
        h('tbody', [
          h('tr', {}, [
            ...columns.map((column: any, cellIndex: number) =>
              h(
                'td',
                {
                  key: cellIndex,
                  colspan: column.colSpan,
                  rowspan: column.rowSpan,
                  class: getCellClasses(columns, cellIndex),
                  style: getCellStyles(column, cellIndex),
                },
                [
                  h(
                    'div',
                    {
                      class: ['cell', column.labelClassName],
                    },
                    [sums[cellIndex]],
                  ),
                ],
              ),
            ),
          ]),
        ]),
      ],
    );
  },
});
