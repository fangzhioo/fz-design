<script lang="ts">
import { defineComponent, renderSlot, watch } from 'vue';
import { useTheme, provideLocale, provideGlobalConfig } from '@fzui/hooks';
import { configProviderProps } from './ConfigProvider';

export default defineComponent({
  name: 'FzConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    provideLocale();
    const theme = useTheme();
    watch(theme, () => {
      if (theme.value) {
        document.documentElement.setAttribute('data-mode', theme.value);
      }
    });
    const config = provideGlobalConfig(props);
    return () => renderSlot(slots, 'default', { config: config?.value });
  },
});
</script>
