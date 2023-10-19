<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { Props } from './props'
  import { useOffset } from './hooks/use-offset'
  import { useSlider } from './hooks/use-slider'

  defineOptions({ name: 'FzSlider' })

  const prop = defineProps(Props)

  const emit = defineEmits(['input', 'change'])

  const modelValue = defineModel<number>({ default: 0, type: Number })

  /** 输入条元素 */
  const sliderEl = ref<HTMLDivElement>()

  /** 滑块小球 dom 元素 */
  const circleEl = ref<HTMLDivElement>()

  const { offset, offsetLeft, setPosition } = useOffset(sliderEl, prop, modelValue, emit)

  onMounted((): void => {
    /** 如果元素节点存在 */
    if (circleEl.value) {
      /** 开始监听 dom 按下时的事件 */
      useSlider(circleEl.value, offsetLeft, (num: number, etv: 'input' | 'change'): void => {
        if (prop.disabled) return

        /** 获取到当前拖动的占比 */
        const percentage: number =
          (num * 100) / (sliderEl.value as HTMLDivElement).clientWidth

        /** 重新设置样式位置 */
        setPosition(percentage, etv)
      })

      setPosition(((prop.modelValue - prop.min) * 100) / (prop.max - prop.min))
    }
  })
</script>

<template>
  <div
    ref="sliderEl"
    role="slider"
    :class="['fz-slider', { 'is-disabled': prop.disabled }]"
  >
    <div class="fz-slider__road">
      <!-- 进度条 -->
      <div class="fz-slider__selected" :style="`width: ${offset}%`" />

      <!-- 拖动按钮 -->
      <div ref="circleEl" class="fz-slider__icon" :style="`left: ${offset}%`" />
    </div>
  </div>
</template>
