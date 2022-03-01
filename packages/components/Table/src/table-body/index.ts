import { defineComponent, getCurrentInstance, h, watch, onUnmounted, onUpdated, inject } from 'vue';
import { isClient } from '@vueuse/core';
import { addClass, removeClass } from '@fzui/utils';
import useLayoutObserver from '../table-utils/layout-observer';
import { removePopper } from '../table-utils/util';
import useRender from './render-helper';
import defaultProps from './TableBody';

import type { VNode } from 'vue';
import { FZ_TABLE_INJECT_KEY } from '@fzui/constants';

export default defineComponent({
  name: 'FzTableBody',
  props: defaultProps,
  setup(props) {
    const instance = getCurrentInstance();
    const parent = inject<any>(FZ_TABLE_INJECT_KEY);
    const { wrappedRowRender, tooltipContent, tooltipTrigger } = useRender(props);
    const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent!);

    watch(props.store.states.hoverRow, (newVal: any, oldVal: any) => {
      if (!props.store.states.isComplex.value || !isClient) {
        return;
      }
      let raf = window.requestAnimationFrame;
      if (!raf) {
        raf = (fn) => window.setTimeout(fn, 16);
      }
      raf(() => {
        const rows = instance?.vnode.el?.querySelectorAll('.fz-table__row');
        const oldRow = rows[oldVal];
        const newRow = rows[newVal];
        if (oldRow) {
          removeClass(oldRow, 'hover-row');
        }
        if (newRow) {
          addClass(newRow, 'hover-row');
        }
      });
    });

    onUnmounted(() => {
      removePopper?.();
    });
    onUpdated(() => {
      removePopper?.();
    });

    return {
      onColumnsChange,
      onScrollableChange,
      wrappedRowRender,
      tooltipContent,
      tooltipTrigger,
    };
  },
  render() {
    const { wrappedRowRender, store } = this;
    const data = store.states.data.value || [];
    return h('tbody', {}, [
      data.reduce((acc: VNode[], row: any) => {
        const other: any = wrappedRowRender(row, acc.length);
        return acc.concat(other);
      }, []),
    ]);
  },
});
