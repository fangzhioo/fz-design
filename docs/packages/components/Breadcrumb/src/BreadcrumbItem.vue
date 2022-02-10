<template>
  <span class="fz-breadcrumb__item">
    <span ref="link" :class="['fz-breadcrumb__inner', to ? 'is-link' : '']" role="link">
      <slot></slot>
    </span>
    <fz-icon v-if="separatorIcon" :name="separatorIcon" class="fz-breadcrumb__separator" />
    <span v-else class="fz-breadcrumb__separator" role="presentation">
      {{ separator }}
    </span>
  </span>
</template>

<script lang="ts">
import { FZ_BREADCRUMB_INJECT_KEY } from '@fzui/utils/constants';
import { defineComponent, getCurrentInstance, inject, onMounted, ref } from 'vue';
import { breadcrumbItemProps } from './BreadcrumbItem';

import { Icon } from '@fzui/components/Icon';
import { BreadcrumbInstance } from './Breadcrumb';

export default defineComponent({
  name: 'FzBreadcrumbItem',
  components: {
    FzIcon: Icon,
  },
  props: breadcrumbItemProps,
  setup(props) {
    const instance = getCurrentInstance();
    const router = instance ? instance.appContext.config.globalProperties.$router : null;
    const parent = inject<BreadcrumbInstance>(FZ_BREADCRUMB_INJECT_KEY);

    const link = ref<HTMLSpanElement>();

    onMounted(() => {
      if (!link.value) {
        return;
      }
      link.value.setAttribute('role', 'link');
      link.value.addEventListener('click', () => {
        if (!props.to || !router) {
          return;
        }
        if (props.replace) {
          router.replace(props.to);
        } else {
          router.push(props.to);
        }
      });
    });

    return {
      link,
      separator: parent?.separator,
      separatorIcon: parent?.separatorIcon,
    };
  },
});
</script>

<style scoped></style>
