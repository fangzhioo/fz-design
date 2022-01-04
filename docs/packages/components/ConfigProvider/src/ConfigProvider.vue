<script lang="ts">
import { provideLocale } from 'packages/hooks/use-locale';
import { useTheme } from 'packages/hooks/use-theme';
import { FZ_CONFIG_PROVIDER_INJECT_KEY } from 'packages/utils/constants';
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
