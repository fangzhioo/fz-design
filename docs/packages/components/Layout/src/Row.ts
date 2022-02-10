import { ExtractPropTypes, PropType } from 'vue';

type RowJustify = 'start' | 'center' | 'end' | 'space-around' | 'space-between';
type RowAlign = 'top' | 'middle' | 'bottom';

export const rowProps = {
  tag: {
    type: String,
    default: 'div',
  },
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String as PropType<RowJustify>,
    default: 'start',
  },
  align: {
    type: String as PropType<RowAlign>,
    default: 'top',
  },
};

export type RowProps = ExtractPropTypes<typeof rowProps>;
