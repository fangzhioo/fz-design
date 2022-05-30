import { FzFormItemContext } from '@fzui/hooks';
import { Arrayable, castArray, debugWarn } from '@fzui/utils';
import { computed, ref } from 'vue';
import { FormItemProp } from './FormItem';

const SCOPE = 'FzForm';

export function useFormLabelWidth() {
  const potentialLabelWidthArr = ref<number[]>([]);

  const autoLabelWidth = computed(() => {
    if (!potentialLabelWidthArr.value.length) return '0';
    const max = Math.max(...potentialLabelWidthArr.value);
    return max ? `${max}px` : '';
  });

  function getLabelWidthIndex(width: number) {
    const index = potentialLabelWidthArr.value.indexOf(width);
    if (index === -1) {
      debugWarn(SCOPE, `unexpected width ${width}`);
    }
    return index;
  }

  function registerLabelWidth(val: number, oldVal: number) {
    if (val && oldVal) {
      const index = getLabelWidthIndex(oldVal);
      potentialLabelWidthArr.value.splice(index, 1, val);
    } else if (val) {
      potentialLabelWidthArr.value.push(val);
    }
  }

  function deregisterLabelWidth(val: number) {
    const index = getLabelWidthIndex(val);
    if (index > -1) {
      potentialLabelWidthArr.value.splice(index, 1);
    }
  }

  return {
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth,
  };
}

export const filterFields = (fields: FzFormItemContext[], props: Arrayable<FormItemProp>) => {
  const normalized = castArray(props);
  return normalized.length > 0 ? fields.filter((field) => field.prop && normalized.includes(field.prop)) : fields;
};
