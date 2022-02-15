<template>
  <transition name="fz-alert-fade">
    <div v-show="visible" class="fz-alert" :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]" role="alert">
      <fz-icon v-if="showIcon && iconName" :name="iconName" class="fz-alert__icon" :class="isBigIcon" />
      <div class="fz-alert__content">
        <span v-if="title || $slots.title" class="fz-alert__title" :class="[isBoldTitle]">
          <slot name="title">{{ title }}</slot>
        </span>
        <p v-if="$slots.default || description" class="fz-alert__description">
          <slot>
            {{ description }}
          </slot>
        </p>
        <template v-if="closable">
          <div v-if="closeText" class="fz-alert__closebtn is-customed" @click="close">
            {{ closeText }}
          </div>
          <fz-icon v-else class="fz-alert__closebtn" @click="close" name="close-bold" />
        </template>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { alertEmits, alertProps } from './Alert';
import { Icon } from '@fzui/components/Icon';
import { TypeIconsNameMap } from '@fzui/utils';

export default defineComponent({
  name: 'FzAlert',
  components: {
    FzIcon: Icon,
  },
  props: alertProps,
  emits: alertEmits,

  setup(props, { emit, slots }) {
    // state
    const visible = ref(true);

    // computed
    const typeClass = computed(() => `fz-alert--${props.type}`);
    const iconName = computed(() => TypeIconsNameMap[props.type] || TypeIconsNameMap['info']);
    const isBigIcon = computed(() => (props.description || slots.default ? 'is-big' : ''));
    const isBoldTitle = computed(() => (props.description || slots.default ? 'is-bold' : ''));

    // methods
    const close = (evt: MouseEvent) => {
      visible.value = false;
      emit('close', evt);
    };

    return {
      visible,
      typeClass,
      iconName,
      isBigIcon,
      isBoldTitle,
      close,
    };
  },
});
</script>
