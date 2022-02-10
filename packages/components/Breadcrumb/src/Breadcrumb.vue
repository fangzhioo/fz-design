<template>
  <div ref="breadcrumb" class="fz-breadcrumb" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, onMounted } from 'vue';
import { FZ_BREADCRUMB_INJECT_KEY } from '@fzui/utils/constants';
import { breadcrumbProps } from './Breadcrumb';

export default defineComponent({
  name: 'FzBreadcrumb',
  props: breadcrumbProps,

  setup(props) {
    const breadcrumb = ref<HTMLDivElement>();

    provide(FZ_BREADCRUMB_INJECT_KEY, props);

    onMounted(() => {
      if (breadcrumb.value) {
        const items = breadcrumb.value.querySelectorAll('.fz-breadcrumb__item');
        if (items.length) {
          items[items.length - 1].setAttribute('aria-current', 'page');
        }
      }
    });

    return {
      breadcrumb,
    };
  },
});
</script>
