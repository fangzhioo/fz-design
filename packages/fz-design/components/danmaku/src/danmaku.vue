<script lang="ts" setup>
  import {
    createApp,
    nextTick,
    onMounted,
    onBeforeUnmount,
    ref,
    reactive,
    computed,
    h
  } from 'vue'
  import type { DanChannel, DanmuItem, DanmakuItem, Danmu } from './interface'
  import { useModelWrapper } from './utils'
  import { Emits, Props } from './props'
  import { useNamespace } from '../../../hooks'
  import { addClass, removeClass, throwError } from '../../../utils'

  defineOptions({
    name: 'FzDanmaku'
  })
  const ns = useNamespace('danmaku')
  const props = defineProps(Props)
  const emit = defineEmits(Emits)
  const slots = defineSlots()
  const dmClass = ns.e('cell')
  const dmMoveClass = ns.is('move')
  const dmPauseClass = ns.is('pause')
  const cssVarScrollWidth = ns.cssVarBlockName('scroll-width')

  // 容器
  let container = ref<HTMLDivElement>(document.createElement('div'))
  let dmContainer = ref<HTMLDivElement>(document.createElement('div'))
  const containerWidth = ref(0)
  const containerHeight = ref(0)
  // 变量
  let timer: any = 0
  const calcChannels = ref(0)
  const danmuHeight = ref(0)
  const index = ref<number>(0)

  const paused = ref(false)
  const danChannel = ref<DanChannel>({})

  const danmuList = useModelWrapper<Danmu[]>(props, emit, 'danmus')

  const danmaku: DanmakuItem = reactive({
    channels: computed(() => props.channels || calcChannels.value),
    autoplay: computed(() => props.autoplay),
    loop: computed(() => props.loop),
    useSlot: computed(() => props.useSlot),
    debounce: computed(() => props.debounce),
    randomChannel: computed(() => props.randomChannel)
  })

  const danmu: DanmuItem = reactive({
    height: computed(() => danmuHeight.value),
    fontSize: computed(() => props.fontSize),
    speeds: computed(() => props.speeds),
    top: computed(() => props.top),
    right: computed(() => props.right)
  })

  onMounted(() => {
    init()
  })

  onBeforeUnmount(() => {
    clear()
  })

  function init (): void {
    initCore()
    props.isSuspend && initSuspendEvents()
    if (danmaku.autoplay) {
      play()
    }
  }

  function initCore (): void {
    containerWidth.value = container.value.offsetWidth
    containerHeight.value = container.value.offsetHeight
    if (containerWidth.value === 0 || containerHeight.value === 0) {
      throwError('FzDanmaku', '获取不到容器宽高')
    }
  }

  function play (): void {
    paused.value = false
    if (!timer) {
      timer = setInterval(() => draw(), danmaku.debounce)
    }
  }

  /**
   * 绘制弹幕
   */
  function draw (): void {
    if (!paused.value && danmuList.value.length) {
      if (index.value > danmuList.value.length - 1) {
        const screenDanmus = dmContainer.value.children.length

        if (danmaku.loop) {
          if (screenDanmus < index.value) {
            // 一轮弹幕插入完毕
            emit('list-end')
            index.value = 0
          }
          insert()
        }
      } else {
        insert()
      }
    }
  }

  /**
   * 插入弹幕（也暴露到外部，允许外部直接执行绘制弹幕方法）
   * @param {Object} dm 外部定义的弹幕
   */
  function insert (dm?: any): void {
    const _index = danmaku.loop ? index.value % danmuList.value.length : index.value
    const _danmu = dm || danmuList.value[_index]
    let el = document.createElement('div')

    if (danmaku.useSlot) {
      el = getSlotComponent(_danmu, _index).$el
    } else {
      el.innerHTML = _danmu as string
      el.setAttribute('style', props.extraStyle)
      el.style.fontSize = `${danmu.fontSize}px`
      el.style.lineHeight = `${danmu.fontSize}px`
    }
    addClass(el, dmClass)
    dmContainer.value.appendChild(el)
    el.style.opacity = '0'
    nextTick(() => {
      if (!danmu.height) {
        danmuHeight.value = el.offsetHeight
      }
      // 如果没有设置轨道数，则在获取到所有高度后计算出最大轨道数
      if (!danmaku.channels) {
        calcChannels.value = Math.floor(
          containerHeight.value / (danmu.height + danmu.top)
        )
      }
      let channelIndex = getChannelIndex(el)
      if (channelIndex >= 0) {
        const width = el.offsetWidth
        const height = danmu.height
        addClass(el, dmMoveClass)
        el.dataset.index = `${_index}`
        el.style.opacity = '1'
        el.style.top = channelIndex * (height + danmu.top) + 'px'
        el.style.width = width + danmu.right + 'px'
        el.style.setProperty(cssVarScrollWidth, `-${containerWidth.value + width}px`)
        el.style.left = `${containerWidth.value}px`
        el.style.animationDuration = `${containerWidth.value / danmu.speeds}s`
        el.addEventListener('animationend', () => {
          if (Number(el.dataset.index) === danmuList.value.length - 1 && !danmaku.loop) {
            emit('play-end', el.dataset.index)
          }
          dmContainer.value && dmContainer.value.removeChild(el)
        })
        index.value++
      } else {
        dmContainer.value.removeChild(el)
      }
    })
  }

  function getSlotComponent (_danmu: any, _index: number): any {
    const DmComponent = createApp({
      // eslint-disable-next-line vue/component-api-style
      render () {
        return h('div', {}, [
          slots.dm &&
            slots.dm({
              danmu: _danmu,
              index: _index
            })
        ])
      }
    })

    const ele = DmComponent.mount(document.createElement('div'))

    return ele
  }

  function getChannelIndex (el: HTMLDivElement): number {
    let _channels = [...Array(danmaku.channels).keys()]

    if (danmaku.randomChannel) {
      _channels = _channels.sort(() => 0.5 - Math.random())
    }
    for (let i of _channels) {
      const items = danChannel.value[i]

      if (items && items.length) {
        for (let j = 0; j < items.length; j++) {
          const danRight = getDanRight(items[j]) - 10
          // 安全距离判断
          if (
            danRight <= (el.offsetWidth - items[j].offsetWidth) * 0.88 ||
            danRight <= 0
          ) {
            break
          }
          if (j === items.length - 1) {
            danChannel.value[i].push(el)
            el.addEventListener('animationend', () => danChannel.value[i].splice(0, 1))
            return i % danmaku.channels
          }
        }
      } else {
        danChannel.value[i] = [el]
        el.addEventListener('animationend', () => danChannel.value[i].splice(0, 1))
        return i % danmaku.channels
      }
    }
    return -1
  }

  /**
   * 获取弹幕右侧到屏幕右侧的距离
   */
  function getDanRight (el: HTMLDivElement): number {
    const eleWidth = el.offsetWidth || parseInt(el.style.width)
    const eleRight =
      el.getBoundingClientRect().right ||
      dmContainer.value.getBoundingClientRect().right + eleWidth
    return dmContainer.value.getBoundingClientRect().right - eleRight
  }

  function clearTimer (): void {
    clearInterval(timer)
    timer = 0
  }

  function initSuspendEvents (): void {
    let suspendDanmus: HTMLElement[] = []
    dmContainer.value.addEventListener('mouseover', e => {
      let target = e.target as EventTarget & HTMLElement

      if (!target.className.includes(dmClass)) {
        target = target.closest(`.${dmClass}`) || target
      }

      if (!target.className.includes(dmClass)) return

      if (suspendDanmus.includes(target)) return

      emit('dm-over', { el: target })
      addClass(target, dmPauseClass)
      suspendDanmus.push(target)
    })
    dmContainer.value.addEventListener('mouseout', e => {
      let target = e.target as EventTarget & HTMLElement

      if (!target.className.includes(dmClass)) {
        target = target.closest(`.${dmClass}`) || target
      }

      if (!target.className.includes(dmClass)) return
      emit('dm-out', { el: target })
      removeClass(target, dmPauseClass)
      // 容错处理
      suspendDanmus.forEach(item => {
        removeClass(item, dmPauseClass)
      })
      suspendDanmus = []
    })
  }

  /**
   * 清空弹幕
   */
  function clear (): void {
    clearTimer()
    index.value = 0
  }

  /**
   * 重置弹幕
   */
  function reset (): void {
    danmuHeight.value = 0
    init()
  }

  /**
   * 停止弹幕
   */
  function stop (): void {
    danChannel.value = {}
    dmContainer.value.innerHTML = ''
    paused.value = true
    clear()
  }

  /**
   * 暂停弹幕
   */
  function pause (): void {
    paused.value = true
  }

  /**
   * 添加弹幕（插入到当前播放的弹幕位置）
   */
  function add (danmu: Danmu): number {
    if (index.value === danmuList.value.length) {
      // 如果当前弹幕已经播放完了，那么仍然走 push
      danmuList.value.push(danmu)

      return danmuList.value.length - 1
    } else {
      const _index = index.value % danmuList.value.length
      danmuList.value.splice(_index, 0, danmu)

      return _index + 1
    }
  }

  /**
   * 添加弹幕（插入到弹幕末尾）
   */
  function push (danmu: Danmu): number {
    danmuList.value.push(danmu)

    return danmuList.value.length - 1
  }

  /**
   * 获取播放状态
   */
  function getPlayState (): boolean {
    return !paused.value
  }

  function resize (): void {
    initCore()
    const items = dmContainer.value.getElementsByClassName(dmClass)

    for (let i = 0; i < items.length; i++) {
      const el = items[i] as HTMLDivElement

      el.style.setProperty(
        cssVarScrollWidth,
        `-${containerWidth.value + el.offsetWidth}px`
      )
      el.style.left = `${containerWidth.value}px`
      el.style.animationDuration = `${containerWidth.value / danmu.speeds}s`
    }
  }

  defineExpose({
    // element
    container,
    dmContainer,

    // variable
    paused,
    danmuList,

    // function
    getPlayState,
    resize,
    play,
    pause,
    stop,
    reset,
    add,
    push,
    insert
  })
</script>
<template>
  <div ref="container" :class="ns.b()">
    <div
      ref="dmContainer"
      :class="[ns.e('container'), ns.is('hidden', hidden), ns.is('paused', paused)]"
    />
    <slot />
  </div>
</template>
