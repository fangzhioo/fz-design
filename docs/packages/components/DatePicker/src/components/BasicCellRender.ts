import { FZ_PICKER_DATE_INJECT_KEY } from '@fzui/constants';
import { defineComponent, h, inject, PropType } from 'vue';
import type { DateCell } from '../DatePicker';

export default defineComponent({
  name: 'FzDatePickerCell',
  props: {
    cell: {
      type: Object as PropType<DateCell>,
    },
  },
  setup(props) {
    const picker = inject<any>(FZ_PICKER_DATE_INJECT_KEY);

    return () => {
      const cell = props.cell;
      if (picker?.ctx.slots.default) {
        const list = picker.ctx.slots.default(cell).filter((item: any) => {
          return item.patchFlag !== -2 && item.type.toString() !== 'Symbol(Comment)';
        });
        if (list.length) {
          return list;
        }
      }
      return h(
        'div',
        {
          class: 'fz-date-table-cell',
        },
        [
          h(
            'span',
            {
              class: 'fz-date-table-cell__text',
            },
            [cell?.text],
          ),
        ],
      );
    };
  },
});
