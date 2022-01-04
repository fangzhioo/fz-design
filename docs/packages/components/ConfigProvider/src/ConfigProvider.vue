<script lang="ts">
import { defineComponent, provide, watch } from 'vue';
import { useTheme, provideLocale } from '@fzui/hooks';
import { FZ_CONFIG_PROVIDER_INJECT_KEY } from '@fzui/utils/constants';
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
