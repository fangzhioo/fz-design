<script lang="ts" setup>
  import { ref, computed, unref } from 'vue'
  import { IconCodesandbox, IconCodepen } from '@fz-design/fz-design-icon'

  defineOptions({ name: 'VpDemo' })

  const prop = defineProps({
    /** 是否展开 */
    open: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['open', 'close'])

  /** 是否打开 */
  const isOpened = ref<boolean>(prop.open)

  /** 点击触发 */
  const handleClick = (): void => {
    isOpened.value = !isOpened.value
    emit(isOpened.value ? 'open' : 'close', isOpened.value)
  }

  const on = {
    beforeEnter(el: any): void {
      if (!el.dataset) {
        el.dataset = {}
      }

      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom

      el.style.maxHeight = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },

    enter(el: any): void {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = `${el.scrollHeight}px`
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.maxHeight = 0
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }

      el.style.overflow = 'hidden'
    },

    afterEnter(el: any): void {
      el.style.maxHeight = ''
      el.style.overflow = el.dataset.oldOverflow
    },

    beforeLeave(el: any): void {
      if (!el.dataset) {
        el.dataset = {}
      }
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.maxHeight = `${el.scrollHeight}px`
      el.style.overflow = 'hidden'
    },

    leave(el: any): void {
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    },

    afterLeave(el: any): void {
      el.style.maxHeight = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }
  }
</script>

<template>
  <div class="vp-demo-card">
    <!-- 展示的内容 -->
    <div v-if="$slots.source" class="vp-demo-card__source">
      <slot name="source" />
    </div>

    <!-- 折叠的内容 -->
    <div class="vp-demo-card__box">
      <transition name="fz-collapse-transition" v-on="on">
        <div v-show="isOpened" class="fz-collapse-animation__wrapper">
          <slot />
        </div>
      </transition>
    </div>

    <!-- 点击展开 / 折叠的区域 -->
    <div
      :class="['vp-demo-card__option', { 'vp-demo-card__option-open': isOpened }]"
      @click="handleClick"
    >
      <span class="vp-demo-card__option-text">
        <fz-svg-icon :icon="isOpened ? IconCodesandbox : IconCodepen"></fz-svg-icon>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .vp-demo-card {
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid var(--code-bg-color, #eee);
    transition: 0.3s;

    // 展示的内容
    &__source {
      padding: 20px;
      box-sizing: border-box;
    }

    // 折叠的内容
    &__box {
      padding: 0 20px;
      box-sizing: border-box;
      border-top: 1px solid var(--code-bg-color, #eee);

      // 滚动条
      &::-webkit-scrollbar {
        width: 7px;
      }

      // 滚动滑块
      &::-webkit-scrollbar-thumb {
        border-radius: 6px;
      }
    }

    // 点击的操作栏
    &__option {
      border-top: 1px solid var(--code-bg-color, #eee);
      height: 45px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      font-size: 15px;
      padding: 10px;
      box-sizing: border-box;
      z-index: 999;

      // 展开使用粘性定位
      &.vp-demo-card__option-open {
        position: sticky;
        bottom: 0px;
      }

      // 描述文字
      &__option-text {
        transition: 0.4s;
        text-align: center;
        display: block;
      }

      &:hover {
        .vp-demo-card__option-text {
          color: #2d5af1;
        }
      }
    }

    // 鼠标移入
    &:hover {
      box-shadow: 0 0 8px 0 #e8edfa99, 0 2px 4px 0 #e8edfa80;
    }
  }
</style>
