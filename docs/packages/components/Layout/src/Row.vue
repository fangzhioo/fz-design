<script lang="ts">
import { FZ_LAYOUT_ROW_INJECT_KEY } from '@fzui/constants';
import { computed, defineComponent, h, provide, renderSlot } from 'vue';
import { rowProps } from './Row';

export default defineComponent({
  name: 'FzRow',
  props: rowProps,
  setup(props, { slots }) {
    const gutter = computed(() => props.gutter);
    provide(FZ_LAYOUT_ROW_INJECT_KEY, { gutter });

    const style = computed(() => {
      const ret = {
        marginLeft: '',
        marginRight: '',
      };
      if (props.gutter) {
        ret.marginLeft = `-${props.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }
      return ret;
    });

    return () =>
      h(
        props.tag,
        {
          class: ['fz-row', props.justify !== 'start' ? `is-justify-${props.justify}` : '', props.align !== 'top' ? `is-align-${props.align}` : ''],
          style: style.value,
        },
        [renderSlot(slots, 'default')],
      );
  },
});
</script>
