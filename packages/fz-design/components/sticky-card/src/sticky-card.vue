<script lang="ts" setup>
  import { Props } from './props'
  import { ref, computed, unref } from 'vue'
  import FzCollapseTransition from '../../collapse-transition/src/collapse-transition.vue';

  defineOptions({ name: 'FzStickyCard' })

  const prop = defineProps(Props)
  const emit = defineEmits(['open', 'close'])

  /** 是否打开 */
  const isOpened = ref<boolean>(prop.open)

  /** 点击触发 */
  const handleClick = (): void => {
    isOpened.value = !isOpened.value
    emit(isOpened.value ? 'open' : 'close', isOpened.value)
  }

  /** 展示的文字内容 */
  const optionText = computed((): string => {
    const { openText, closeText } = prop

    /** 获取都当前语言 */
    const lang = {
      openText: '关闭',
      closeText: '开启'
    }

    return unref(isOpened) ? openText || lang.openText : closeText || lang.closeText
  })
</script>

<template>
  <div class="fz-sticky-card">
    <!-- 展示的内容 -->
    <div v-if="$slots.source" class="fz-sticky-card__source">
      <slot name="source" />
    </div>

    <!-- 折叠的内容 -->
    <div class="fz-sticky-card__box">
      <fz-collapse-transition>
        <div v-show="isOpened" class="fz-collapse-animation__wrapper">
          <slot />
        </div>
      </fz-collapse-transition>
    </div>

    <!-- 点击展开 / 折叠的区域 -->
    <div
      :class="['fz-sticky-card__option', { 'fz-sticky-card__option-open': isOpened }]"
      @click="handleClick"
    >
      <span class="fz-sticky-card__option-text">
        {{ optionText }}
      </span>
    </div>
  </div>
</template>
