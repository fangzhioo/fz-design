<script lang="ts" setup>
  import { Props } from './props'
  import { useMessageWork } from './hooks/use-message-work'
  import { FzSvgIcon } from '../../svg-icon'
  import { isVNode } from 'vue'
  import { isString } from '../../../utils'
  import { IconX } from '@fz-design/fz-design-icon'

  defineOptions({ name: 'FzMessage' })

  const prop = defineProps(Props)
  const {
    ns,
    classList,
    styleList,
    visible,
    isPosition,
    offsetStyle,
    offsetVal,
    onBeforeLeave,
    onAfterLeave,
    clearTimer,
    startTime,
    handelClose
  } = useMessageWork(prop, 'message')

  defineExpose({ offsetVal })
</script>

<template>
  <transition
    mode="out-in"
    appear
    :name="ns.b(`fade-${isPosition ? 'top' : 'bottom'}`)"
    @before-leave="onBeforeLeave"
    @after-leave="onAfterLeave"
  >
    <div
      v-show="visible"
      :class="classList"
      :style="[offsetStyle, styleList]"
      @mouseleave="startTime"
      @mouseenter="clearTimer"
    >
      <!-- 前缀 icon -->
      <div v-if="icon" :class="ns.e('before_icon')">
        <fz-svg-icon :icon="icon" :size="16" />
      </div>

      <!-- 提示信息 -->
      <component :is="message" v-if="isVNode(message)" />
      <div v-else :class="ns.e('text')">{{ message }}</div>

      <!-- 关闭按钮 -->
      <div v-if="closable" :class="ns.e('close')" @click="handelClose">
        <template v-if="isString(closeBtn)">{{ closeBtn }}</template>
        <fz-svg-icon v-else :icon="IconX" :size="15" />
      </div>
    </div>
  </transition>
</template>
