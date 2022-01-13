import { ComponentSize } from '@fzui/hooks';
import { ref } from 'vue';

export const useSize = () => {
  const size = ref<ComponentSize>('medium');

  const setSize = (s: ComponentSize) => {
    size.value = s;
  };
  return {
    size,
    setSize,
  };
};
