import { createVNode, CSSProperties, defineComponent, ExtractPropTypes, h, PropType, renderSlot } from 'vue';
import type { ZIndexProperty } from 'csstype';
import type Overlay from './Overlay.vue';
import { useSameTarget } from '@fzui/hooks';
import { PatchFlags } from '@fzui/constants';

export const overlayEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const overlayProps = {
  mask: {
    type: Boolean,
    default: true,
  },
  customMaskEvent: {
    type: Boolean,
    default: false,
  },
  overlayClass: {
    type: [String, Array, Object] as PropType<string | string[] | Record<string, boolean>>,
  },
  zIndex: {
    type: [String, Number] as PropType<ZIndexProperty>,
  },
};

export type OverlayProps = ExtractPropTypes<typeof overlayProps>;
export type OverlayEmits = typeof overlayEmits;
export type OverlayInstance = InstanceType<typeof Overlay>;

export default defineComponent({
  name: 'FzOverlay',

  props: overlayProps,
  emits: overlayEmits,

  setup(props, { slots, emit }) {
    const onMaskClick = (e: MouseEvent) => {
      emit('click', e);
    };

    const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? undefined : onMaskClick);
    // eslint-disable-next-line no-bitwise
    const patchFlags = PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS;
    // init here
    return () => {
      // when the vnode meets the same structure but with different change trigger
      // it will not automatically update, thus we simply use h function to manage updating
      return props.mask
        ? createVNode(
            'div',
            {
              class: ['fz-overlay', props.overlayClass],
              style: {
                zIndex: props.zIndex,
              },
              onClick,
              onMousedown,
              onMouseup,
            },
            [renderSlot(slots, 'default')],
            patchFlags,
            ['onClick', 'onMouseup', 'onMousedown'],
          )
        : h(
            'div',
            {
              class: props.overlayClass,
              style: {
                zIndex: props.zIndex,
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              } as CSSProperties,
            },
            [renderSlot(slots, 'default')],
          );
    };
  },
});
