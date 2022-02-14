<script lang="ts">
import { FZ_LAYOUT_ROW_INJECT_KEY } from '@fzui/constants';
import { computed, CSSProperties, defineComponent, h, inject, renderSlot } from 'vue';
import { colProps } from './Col';

export default defineComponent({
  name: 'FzCol',
  props: colProps,
  setup(props, { slots }) {
    const { gutter } = inject(FZ_LAYOUT_ROW_INJECT_KEY, { gutter: { value: 0 } });

    const style = computed<CSSProperties>(() => {
      if (gutter.value) {
        return {
          paddingLeft: `${gutter.value / 2}px`,
          paddingRight: `${gutter.value / 2}px`,
        };
      }
      return {};
    });

    const classList = computed(() => {
      const classes: string[] = [];

      const pos: any[] = ['span', 'offset', 'pull', 'push'];
      pos.forEach((prop) => {
        const size = props[prop];
        if (typeof size === 'number') {
          if (prop === 'span') {
            classes.push(`fz-col-${props[prop]}`);
          } else if (size > 0) {
            classes.push(`fz-col-${prop}-${props[prop]}`);
          }
        }
      });

      const sizes: any[] = ['xs', 'sm', 'md', 'lg', 'xl'];
      sizes.forEach((size) => {
        if (typeof props[size] === 'number') {
          classes.push(`fz-col-${size}-${props[size]}`);
        } else if (typeof props[size] === 'object') {
          const sizeProps: any = props[size];
          Object.keys(sizeProps).forEach((prop) => {
            classes.push(prop !== 'span' ? `fz-col-${size}-${prop}-${sizeProps[prop]}` : `fz-col-${size}-${sizeProps[prop]}`);
          });
        }
      });
      // this is for the fix
      if (gutter.value) {
        classes.push('is-guttered');
      }

      return classes;
    });

    return () =>
      h(
        props.tag,
        {
          class: ['fz-col', classList.value],
          style: style.value,
        },
        [renderSlot(slots, 'default')],
      );
  },
});
</script>

<style scoped></style>
