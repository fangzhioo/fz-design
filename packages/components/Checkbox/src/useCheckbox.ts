import { ref, computed, inject, getCurrentInstance, watch } from 'vue';

import type { ExtractPropTypes } from 'vue';
import { FzFormContext, FzFormItemContext, useSize } from '@fzui/hooks';
import { checkboxProps } from './Checkbox';
import { CHANGE_EVENT, FZ_CHECKBOX_GROUP_INJECT_KEY, FZ_FORMITEM_INJECT_KEY, FZ_FORM_INJECT_KEY, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { isBoolean } from '@fzui/utils';

export type IUseCheckboxProps = ExtractPropTypes<typeof checkboxProps>;

export const useCheckboxGroup = () => {
  const elForm = inject(FZ_FORM_INJECT_KEY, {} as FzFormContext);
  const elFormItem = inject(FZ_FORMITEM_INJECT_KEY, {} as FzFormItemContext);
  const checkboxGroup = inject<any>(FZ_CHECKBOX_GROUP_INJECT_KEY, {});
  const isGroup = computed(() => checkboxGroup && checkboxGroup.name === 'FzCheckboxGroup');
  const elFormItemSize = computed(() => elFormItem.size);
  return {
    isGroup,
    checkboxGroup,
    elForm,
    elFormItemSize,
    elFormItem,
  };
};

const useModel = (props: IUseCheckboxProps) => {
  const selfModel = ref(false);
  const { isGroup, checkboxGroup } = useCheckboxGroup();
  const isLimitExceeded = ref(false);
  const instance = getCurrentInstance()!;
  const { emit } = instance;
  const model = computed({
    get() {
      return isGroup.value ? checkboxGroup.modelValue.value : props.modelValue ?? selfModel.value;
    },

    set(val: unknown) {
      if (isGroup.value && Array.isArray(val)) {
        isLimitExceeded.value = checkboxGroup.max !== undefined && val.length > checkboxGroup.max.value;

        if (isLimitExceeded.value === false) {
          checkboxGroup.changeEvent(val);
        }
      } else {
        selfModel.value = val as boolean;
        emit(UPDATE_MODEL_EVENT, val);
      }
    },
  });

  return {
    model,
    isLimitExceeded,
  };
};

const useCheckboxStatus = (props: IUseCheckboxProps, { model }: any) => {
  const { isGroup, checkboxGroup } = useCheckboxGroup();
  const focus = ref(false);
  const size = useSize(checkboxGroup.checkboxGroupSize, { prop: true });
  const isChecked = computed<boolean>(() => {
    const value = model.value;
    if (isBoolean(value)) {
      return value;
    } else if (Array.isArray(value)) {
      return value.includes(props.label);
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel;
    }
    return Boolean(value);
  });

  const checkboxSize = useSize(computed(() => (isGroup.value ? checkboxGroup.checkboxGroupSize.value : undefined)));

  return {
    isChecked,
    focus,
    size,
    checkboxSize,
  };
};

const useDisabled = (props: IUseCheckboxProps, { model, isChecked }: any) => {
  const { elForm, isGroup, checkboxGroup } = useCheckboxGroup();
  const isLimitDisabled = computed(() => {
    const max = checkboxGroup.max.value;
    const min = checkboxGroup.min.value;
    return (Boolean(max || min) && model.value.length >= max && !isChecked.value) || (model.value.length <= min && isChecked.value);
  });
  const isDisabled = computed(() => {
    const disabled = props.disabled || elForm.disabled;
    return isGroup.value ? checkboxGroup.disabled.value || disabled || isLimitDisabled.value : props.disabled || elForm.disabled;
  });

  return {
    isDisabled,
    isLimitDisabled,
  };
};

const setStoreValue = (props: IUseCheckboxProps, { model }: any) => {
  function addToStore() {
    if (Array.isArray(model.value) && !model.value.includes(props.label)) {
      model.value.push(props.label);
    } else {
      model.value = props.trueLabel || true;
    }
  }
  if (props.checked) {
    addToStore();
  }
};

const useEvent = (props: IUseCheckboxProps, { isLimitExceeded }: any) => {
  const { elFormItem } = useCheckboxGroup();
  const { emit } = getCurrentInstance()!;
  function handleChange(e: Event) {
    if (isLimitExceeded!.value) {
      return;
    }
    const target = e.target as HTMLInputElement;
    const value = target.checked ? props.trueLabel ?? true : props.falseLabel ?? false;

    emit(CHANGE_EVENT, value, e);
  }

  watch(
    () => props.modelValue,
    () => {
      elFormItem.validate?.(CHANGE_EVENT);
    },
  );

  return {
    handleChange,
  };
};

export const useCheckbox = (props: IUseCheckboxProps) => {
  const { model, isLimitExceeded } = useModel(props);
  const { focus, size, isChecked, checkboxSize } = useCheckboxStatus(props, {
    model,
  });
  const { isDisabled } = useDisabled(props, { model, isChecked });
  const { handleChange } = useEvent(props, { isLimitExceeded });

  setStoreValue(props, { model });

  return {
    isChecked,
    isDisabled,
    checkboxSize,
    model,
    handleChange,
    focus,
    size,
  };
};
