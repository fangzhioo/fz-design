<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useLocale, useNamespace } from '../../../hooks'
  import { Emits, Props } from './props'
  import type { TooltipInstance } from '../../tooltip'
  import { addUnit } from '../../../utils'
  import { FzTooltip, FzSvgIcon, FzButton } from '../..'

  defineOptions({ name: 'FzPopconfirm' })

  const props = defineProps(Props)
  const emit = defineEmits(Emits)
  const { t } = useLocale()

  const ns = useNamespace('popconfirm')

  const tooltipRef = ref<TooltipInstance>()

  const hidePopper = (): void => {
    tooltipRef.value?.onClose?.()
  }

  const style = computed(() => {
    return {
      width: addUnit(props.width)
    }
  })

  const confirm = (e: MouseEvent): void => {
    emit('confirm', e)
    hidePopper()
  }
  const cancel = (e: MouseEvent): void => {
    emit('cancel', e)
    hidePopper()
  }

  const finalConfirmButtonText = computed(
    () => props.confirmButtonText || t('fz.popconfirm.confirmButtonText')
  )
  const finalCancelButtonText = computed(
    () => props.cancelButtonText || t('fz.popconfirm.cancelButtonText')
  )
</script>

<template>
  <fz-tooltip
    ref="tooltipRef"
    trigger="click"
    effect="light"
    v-bind="$attrs"
    :popper-class="`${ns.namespace}-popover`"
    :popper-style="style"
    :teleported="teleported"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :hide-after="hideAfter"
    :persistent="persistent"
  >
    <template #content>
      <div :class="ns.b()">
        <div :class="ns.e('main')">
          <fz-svg-icon
            v-if="!hideIcon && icon"
            :class="ns.e('icon')"
            :style="{ color: iconColor }"
          >
            <component :is="icon" />
          </fz-svg-icon>
          {{ title }}
        </div>
        <div :class="ns.e('action')">
          <fz-button
            size="small"
            :type="cancelButtonType === 'text' ? '' : cancelButtonType"
            :text="cancelButtonType === 'text'"
            @click="cancel"
          >
            {{ finalCancelButtonText }}
          </fz-button>
          <fz-button
            size="small"
            :type="confirmButtonType === 'text' ? '' : confirmButtonType"
            :text="confirmButtonType === 'text'"
            @click="confirm"
          >
            {{ finalConfirmButtonText }}
          </fz-button>
        </div>
      </div>
    </template>
    <template v-if="$slots.reference">
      <slot name="reference" />
    </template>
  </fz-tooltip>
</template>
