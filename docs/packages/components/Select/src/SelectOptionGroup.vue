<template>
  <ul v-show="visible" class="fz-select-group__wrap">
    <li class="fz-select-group__title">{{ label }}</li>
    <li>
      <ul class="fz-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { FZ_SELECT_GROUP_INJECT_KEY, FZ_SELECT_INJECT_KEY } from '@fzui/constants';
import { defineComponent, provide, inject, ref, reactive, toRefs, getCurrentInstance, onMounted, watch, toRaw } from 'vue';
import { SelectContext, selectOptionGroupProps } from './Select';

export default defineComponent({
  name: 'FzOptionGroup',
  props: selectOptionGroupProps,
  setup(props) {
    const visible = ref(true);
    const instance = getCurrentInstance()!;
    const children = ref<any[]>([]);

    provide(
      FZ_SELECT_GROUP_INJECT_KEY,
      reactive({
        ...toRefs(props),
      }),
    );

    const select = inject<SelectContext>(FZ_SELECT_INJECT_KEY)!;

    // get all instances of options
    const flattedChildren = (node: any) => {
      const children: any[] = [];
      if (Array.isArray(node.children)) {
        node.children.forEach((child: any) => {
          if (child.type && child.type.name === 'FzOption' && child.component && child.component.proxy) {
            children.push(child.component.proxy);
          } else if (child.children?.length) {
            children.push(...flattedChildren(child));
          }
        });
      }
      return children;
    };

    const { groupQueryChange } = toRaw(select);
    watch(groupQueryChange, () => {
      visible.value = children.value.some((option) => option.visible === true);
    });

    onMounted(() => {
      children.value = flattedChildren(instance.subTree);
    });

    return {
      visible,
    };
  },
});
</script>
