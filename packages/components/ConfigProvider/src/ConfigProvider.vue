<script lang="ts">
import { defineComponent, renderSlot } from 'vue';
import { provideGlobalConfig } from '@fzui/hooks';
import { configProviderProps } from './ConfigProvider';

export default defineComponent({
  name: 'FzConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const config = provideGlobalConfig(props);
    return () => renderSlot(slots, 'default', { config: config?.value });
  },
});
</script>
