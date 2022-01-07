<script lang="ts">
import { defineComponent, Fragment, createTextVNode, renderSlot, toDisplayString, createCommentVNode, withDirectives, Teleport, h } from 'vue';
import { ClickOutside } from '@fzui/directives';
import FzPopper, { Effect, renderArrow, renderPopper, renderTrigger } from '@fzui/components/Popper';
import { debugWarn } from '@fzui/utils/error';
import { renderIf, PatchFlags } from '@fzui/utils/vnode';
import usePopover from './usePopover';
import { popoverEmits, popoverProps } from './Popover';

const _hoist = { key: 0, class: 'fz-popover__title', role: 'title' };

export default defineComponent({
  name: 'FzPopover',
  components: {
    FzPopper,
  },
  props: popoverProps,
  emits: popoverEmits,
  setup(props, ctx) {
    if (props.visible && !ctx.slots.reference) {
      debugWarn('FzPopover', 'You cannot init popover without given reference');
    }
    const states = usePopover(props as any, ctx as any);

    return states;
  },
  render() {
    const { $slots } = this;
    const trigger = $slots.reference ? $slots.reference() : null;

    const title = renderIf(Boolean(this.title), 'div', _hoist, toDisplayString(this.title), PatchFlags.TEXT);

    const content = renderSlot($slots, 'default', {}, () => [createTextVNode(toDisplayString(this.content), PatchFlags.TEXT)]);

    const {
      events,
      onAfterEnter,
      onAfterLeave,
      onPopperMouseEnter,
      onPopperMouseLeave,
      popperStyle,
      popperId,
      popperClass,
      showArrow,
      transition,
      visibility,
      tabindex,
    } = this;

    const kls = [this.content ? 'fz-popover--plain' : '', 'fz-popover', popperClass].join(' ');

    const popover = renderPopper(
      {
        effect: Effect.LIGHT,
        name: transition,
        popperClass: kls,
        popperStyle,
        popperId,
        visibility,
        onMouseenter: onPopperMouseEnter,
        onMouseleave: onPopperMouseLeave,
        onAfterEnter,
        onAfterLeave,
        stopPopperMouseEvent: false,
      },
      [title, content, renderArrow(showArrow)],
    );

    // when user uses popover directively, trigger will be null so that we only
    // render a popper window for displaying contents
    const _trigger = trigger
      ? renderTrigger(trigger, {
          ariaDescribedby: popperId,
          ref: 'triggerRef',
          tabindex,
          ...events,
        })
      : createCommentVNode('v-if', true);

    return h(Fragment, null, [
      this.trigger === 'click' ? withDirectives(_trigger, [[ClickOutside, this.hide]]) : _trigger,
      h(
        Teleport as any,
        {
          disabled: !this.appendToBody,
          to: 'body',
        },
        [popover],
      ),
    ]);
  },
});
</script>
