import { dialogEmits, dialogProps } from '@fzui/components/Dialog';
import { ExtractPropTypes, PropType } from 'vue';
import type Drawer from './Drawer.vue';

export type DrawerDirectionType = 'ltr' | 'rtl' | 'ttb' | 'btt';

export const drawerEmits = dialogEmits;

export const drawerProps = {
  ...dialogProps,
  direction: {
    type: String as PropType<DrawerDirectionType>,
    default: 'rtl',
  },
  size: {
    type: [String, Number],
    default: '30%',
  },
  withHeader: {
    type: Boolean,
    default: true,
  },
  modalFade: {
    type: Boolean,
    default: true,
  },
};

export type DrawerProps = ExtractPropTypes<typeof drawerProps>;
export type DrawerEmits = typeof drawerEmits;
export type DrawerInstance = InstanceType<typeof Drawer>;
