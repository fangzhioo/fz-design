<script lang="ts">
  import { defineComponent, renderSlot } from 'vue'
  import { provideGlobalConfig } from '../../../hooks'
  import type { ConfigProviderProps } from './props'
  import type { VNode } from 'vue';
  import { Props } from './props'

  export default defineComponent({
    name: 'FzConfigProvider',
    props: Props,
    setup (props: ConfigProviderProps, { slots }) {
      const config = provideGlobalConfig(props)
      return (): VNode => renderSlot(slots, 'default', { config: config?.value })
    }
  })
</script>
