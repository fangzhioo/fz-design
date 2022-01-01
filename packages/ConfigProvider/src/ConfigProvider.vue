<script lang="ts">
import { provideLocale } from 'packages/_hooks/use-locale';
import { useTheme } from 'packages/_hooks/use-theme';
import { FZ_CONFIG_PROVIDER_INJECT_KEY } from 'packages/_utils/constants';
import { defineComponent, provide, watch } from 'vue';
import { configProviderProps } from './ConfigProvider';

export default defineComponent({
  name: 'FzConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    provideLocale();
    provide(FZ_CONFIG_PROVIDER_INJECT_KEY, props);
    const theme = useTheme();
    watch(theme, () => {
      if (theme.value) {
        document.documentElement.setAttribute('data-mode', theme.value);
      }
    });
    return () => slots.default?.();
  },
});
</script>
