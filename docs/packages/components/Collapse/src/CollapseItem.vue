<template>
  <div
    :class="[
      'fz-collapse-item',
      {
        'is-active': isActive,
        'is-disabled': disabled,
      },
    ]"
  >
    <div role="tab" :aria-expanded="isActive" :aria-controls="`fz-collapse-content-${id}`" :aria-describedby="`fz-collapse-content-${id}`">
      <div
        :id="`fz-collapse-head-${id}`"
        :class="[
          'fz-collapse-item__header',
          {
            'is-active': isActive,
            focusing: focusing,
          },
        ]"
        role="button"
        :tabindex="disabled ? -1 : 0"
        @click="handleHeaderClick"
        @keyup.space.enter.stop="handleEnterClick"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot name="title">{{ title }}</slot>
        <fz-icon name="arrow-right-bold" :class="['fz-collapse-item__arrow', { 'is-active': isActive }]"></fz-icon>
      </div>
    </div>
    <fz-collapse-transition>
      <div
        v-show="isActive"
        :id="`fz-collapse-content-${id}`"
        class="fz-collapse-item__wrap"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`fz-collapse-head-${id}`"
      >
        <div class="fz-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </fz-collapse-transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue';
import { FZ_COLLAPSE_INJECT_KEY } from '@fzui/constants';
import { generateUUID } from '@fzui/utils';
import { Icon } from '@fzui/components/Icon';
import { CollapseProvider } from './Collapse';
import { collapseItemEmits, collapseItemProps } from './CollapseItem';
import CollapseTransition from './CollapseTransition.vue';

export default defineComponent({
  name: 'FzCollapseItem',
  components: { FzCollapseTransition: CollapseTransition, FzIcon: Icon },
  props: collapseItemProps,
  emits: collapseItemEmits,
  setup(props) {
    const collapse = inject<CollapseProvider>(FZ_COLLAPSE_INJECT_KEY);

    const contentWrapStyle = ref({
      height: 'auto',
      display: 'block',
    });
    const contentHeight = ref(0);
    const focusing = ref(false);
    const isClick = ref(false);
    const id = ref(generateUUID());

    const isActive = computed(() => {
      return collapse?.activeNames.value.indexOf(props.name) > -1;
    });

    const handleFocus = () => {
      setTimeout(() => {
        if (!isClick.value) {
          focusing.value = true;
        } else {
          isClick.value = false;
        }
      }, 50);
    };

    const handleHeaderClick = () => {
      if (props.disabled) {
        return;
      }
      collapse?.handleItemClick(props.name);
      focusing.value = false;
      isClick.value = true;
    };

    const handleEnterClick = () => {
      collapse?.handleItemClick(props.name);
    };

    return {
      isActive,
      contentWrapStyle,
      contentHeight,
      focusing,
      isClick,
      id,
      handleFocus,
      handleHeaderClick,
      handleEnterClick,
      collapse,
    };
  },
});
</script>
