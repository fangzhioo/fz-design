<script lang="ts">
import {
  defineComponent,
  Fragment,
  Teleport,
  onBeforeUnmount,
  onDeactivated,
  onActivated,
  onMounted,
  renderSlot,
  toDisplayString,
  withDirectives,
  h,
} from 'vue';
import { ClickOutside } from '@fzui/directives';
import usePopper from './use-popper/index';
import { popperProps } from './Popper';
import { renderPopper, renderTrigger, renderArrow } from './renderers';
import { UPDATE_VISIBLE_EVENT } from '@fzui/utils/constants';
import { throwError } from '@fzui/utils/error';

export default defineComponent({
  name: 'FzPopper',
  props: popperProps,
  emits: [UPDATE_VISIBLE_EVENT, 'after-enter', 'after-leave', 'before-enter', 'before-leave'],
  setup(props, ctx) {
    if (!ctx.slots.trigger) {
      throwError('Popper', 'Trigger must be provided');
    }
    // this is a reference that we need to pass down to child component
    // to obtain the child instance

    // return usePopper(props as IPopperOptions, ctx as SetupContext)
    const popperStates = usePopper(props as any, ctx);

    const forceDestroy = () => popperStates.doDestroy(true);
    onMounted(popperStates.initializePopper);
    onBeforeUnmount(forceDestroy);
    onActivated(popperStates.initializePopper);
    onDeactivated(forceDestroy);

    return popperStates;
  },

  render() {
    const {
      $slots,
      appendToBody,
      class: kls,
      style,
      effect,
      hide,
      onPopperMouseEnter,
      onPopperMouseLeave,
      onAfterEnter,
      onAfterLeave,
      onBeforeEnter,
      onBeforeLeave,
      isManualMode,
      popperClass,
      popperId,
      popperStyle,
      pure,
      showArrow,
      transition,
      visibility,
      stopPopperMouseEvent,
      events,
    } = this;

    const isManual = isManualMode();

    const arrow = renderArrow(showArrow);
    const popper = renderPopper(
      {
        effect,
        name: transition,
        popperClass,
        popperId,
        popperStyle,
        pure,
        stopPopperMouseEvent,
        onMouseenter: onPopperMouseEnter,
        onMouseleave: onPopperMouseLeave,
        onAfterEnter,
        onAfterLeave,
        onBeforeEnter,
        onBeforeLeave,
        visibility,
      },
      [
        renderSlot($slots, 'default', {}, () => {
          return [toDisplayString(this.content)];
        }),
        arrow,
      ],
    );

    const _t = $slots.trigger?.();

    const triggerProps = {
      'aria-describedby': popperId,
      class: kls,
      style,
      ref: 'triggerRef',
      ...events,
    };

    const trigger = isManual ? renderTrigger(_t, triggerProps) : withDirectives(renderTrigger(_t, triggerProps), [[ClickOutside, hide]]);

    return h(Fragment, null, [
      trigger,
      h(
        Teleport, // Vue did not support createVNode for Teleport
        {
          to: 'body',
          disabled: !appendToBody,
        },
        [popper],
      ),
    ]);
  },
});
</script>
