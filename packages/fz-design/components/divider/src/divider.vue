<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import type { CSSProperties } from 'vue'
  import { Props } from './props'

  export default defineComponent({
    name: 'FzDivider',
    props: Props,
    setup (props) {
      const dividerStyle = computed(() => {
        return {
          '--fz-border-style': props.borderStyle
        } as CSSProperties
      })
      return {
        dividerStyle
      }
    }
  })
</script>

<template>
  <div
    :class="['fz-divider', `fz-divider--${direction}`]"
    :style="dividerStyle"
    role="separator"
  >
    <div
      v-if="$slots.default && direction !== 'vertical'"
      :class="['fz-divider__text', `is-${contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>
