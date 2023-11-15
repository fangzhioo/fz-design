<script lang="ts" setup>
  import { useNamespace } from '../../../hooks';
import { isNumber, warning } from '../../../utils';
import { Emits, Props } from './props'
  import { onMounted, ref, computed, watch, onBeforeUnmount } from 'vue'

  defineOptions({ name: 'FzNumberAnimate' })

  const props = defineProps(Props)
  const emit = defineEmits(Emits)
  const timer = ref<ReturnType<typeof setInterval> | null>(null)

  const ns = useNamespace('number-animate');

  /** 开始值 */
  const fromNum = ref<number>(props.from)
  /**是否重新执行动画 */
  const again = ref<boolean>(false)

  /**
   * 动画方法
   *
   * @param { number } timestamp 动画时间
   */
  const animate = (timestamp: number): void => {
    /**判断是否需要重新执行 */
    if (again.value) {
      /** 如果需要重新执行，则需要将开始值重新赋值 */
      fromNum.value = props.from
      again.value = false
    }
    /** 目标值 */
    const toNum = Number(props.to)

    /** 检测两个值是否为数字 */
    if (!isNumber(Number(fromNum.value)) || !isNumber(toNum)) {
      /** 期望值不是数字 */
      warning('number-animate', 'Expected value is not a number')
      return
    }

    /** 计算出 执行到达时间 相差值 */
    fromNum.value += Math.floor((toNum / props.duration) * 20)

    if (fromNum.value >= toNum) {
      fromNum.value = toNum
      emit('end', timestamp)
      return
    }

    /**
     * 浏览器执行动画侦
     *
     * @see requestAnimationFrame https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
     */
    window && window.requestAnimationFrame(animate)
  }

  /**
   * 显示的主要内容
   *
   * @see toLocaleString https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
   */
  const content = computed((): number | string => {
    return props.formatter ? props.formatter(fromNum.value) : fromNum.value
  })

  /**
   * 开始执行动画
   *
   * @param { boolean } [target] 是否重新执行，后续调用都默认判断为需要重新执行动画
   */
  const start = (target = true): void => {
    again.value = target
    window && window.requestAnimationFrame(animate)
  }

  const pauseTimer = (): void => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  const startTimer = (): void => {
    if (props.interval <= 0 || !props.autoplay || timer.value) return
    timer.value = setInterval(() => run(), props.interval + props.duration)
  }

  const resetTimer = (): void => {
    pauseTimer()
    startTimer() 
  }

  /** 初始化执行 */
  onMounted((): void => {
    /** 第一次执行不需要重新执行，所以传入 false */
    props.autoplay && start(false)
    props.loop && startTimer()
  })

  onBeforeUnmount(() => {
    pauseTimer();
  })

  watch(
    () => props.interval,
    () => {
      resetTimer()
    }
  )

  watch(
    () => props.loop,
    () => {
      resetTimer()
    }
  )
  
  /**
   * 暴露给外部调用的方法
   *
   * 用于重新执行数字动画
   *
   * 避免外部传入意外不合法的参数，所以没有暴露给外部 start 方法
   */
  const run = (): void => {
    start()
  }

  const classes = computed(() => [
    ns.b(), 
    ns.m(props.size),
    ns.m(props.type)
  ])

  /** 暴露给外部重新执行动画的方法 */
  defineExpose({ run })
</script>

<template>
  <div :class="classes" :style="styles">
    {{ content }}
  </div>
</template>
