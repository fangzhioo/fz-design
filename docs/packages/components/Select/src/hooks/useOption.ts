import { inject, computed, getCurrentInstance, watch, toRaw, unref, reactive } from 'vue';
import { get as getValueByPath, isObject as isObj, escapeRegexpString, toString } from '@fzui/utils';

import type { Ref } from 'vue';
import type { QueryChangeCtx, SelectContext, SelectGroupContext, SelectOptionProps } from '../Select';
import { FZ_SELECT_GROUP_INJECT_KEY, FZ_SELECT_INJECT_KEY } from '@fzui/constants';

export function useOptionStates(props: SelectOptionProps) {
  return reactive({
    index: -1,
    groupDisabled: false,
    visible: true,
    hitState: false,
    hover: false,
  });
}

export type States = ReturnType<typeof useOptionStates>;

export function useOption(props: SelectOptionProps, states: States) {
  const instance = getCurrentInstance()!;

  // inject
  const select = inject<SelectContext>(FZ_SELECT_INJECT_KEY)!;
  const selectGroup = inject<SelectGroupContext>(FZ_SELECT_GROUP_INJECT_KEY, { disabled: false })!;

  // computed
  const isObject = computed(() => isObj(props.value));

  const isEqual = (a: unknown, b: unknown) => {
    if (!isObject.value) {
      return a === b;
    }
    const { valueKey } = select.props;
    if (valueKey) {
      return getValueByPath(a, valueKey) === getValueByPath(b, valueKey);
    }
    return a === b;
  };

  const contains = (arr: any[] = [], target: any) => {
    if (!isObject.value) {
      return arr && arr.indexOf(target) > -1;
    }
    const valueKey = select.props.valueKey;
    return (
      arr &&
      arr.some((item) => {
        if (valueKey) {
          return getValueByPath(item, valueKey) === getValueByPath(target, valueKey);
        }
        return item === target;
      })
    );
  };

  const itemSelected = computed(() => {
    if (!select.props.multiple) {
      return isEqual(props.value, select.props.modelValue);
    }
    return contains(select.props.modelValue as unknown[], props.value);
  });

  const limitReached = computed(() => {
    if (select.props.multiple && select.props.multipleLimit) {
      const modelValue = (select.props.modelValue || []) as unknown[];
      return !itemSelected.value && modelValue.length >= select.props.multipleLimit && select.props.multipleLimit > 0;
    }
    return false;
  });

  const currentLabel = computed(() => {
    return props.label || (isObject.value ? '' : props.value);
  });

  const currentValue = computed(() => {
    return props.value || props.label || '';
  });

  const isDisabled = computed(() => {
    return props.disabled || states.groupDisabled || limitReached.value;
  });

  const hoverItem = () => {
    if (!props.disabled && !selectGroup.disabled) {
      select.hoverIndex = select.optionsArray.indexOf(instance.proxy);
    }
  };

  watch(
    () => currentLabel.value,
    () => {
      if (!props.created && !select.props.remote) {
        select.setSelected();
      }
    },
  );

  watch(
    () => props.value,
    (val, oldVal) => {
      const { remote, valueKey } = select.props;
      if (!props.created && !remote) {
        if (valueKey && typeof val === 'object' && typeof oldVal === 'object' && val[valueKey] === oldVal[valueKey]) {
          return;
        }
        select.setSelected();
      }
    },
  );

  watch(
    () => selectGroup.disabled,
    () => {
      states.groupDisabled = selectGroup.disabled;
    },
    { immediate: true },
  );

  const { queryChange } = toRaw(select);
  watch(queryChange, (changes: Ref<QueryChangeCtx>) => {
    const { query } = unref(changes);

    const regexp = new RegExp(escapeRegexpString(query), 'i');
    const cl = toString(currentLabel.value); // 保证为字符串
    states.visible = regexp.test(cl) || props.created;
    if (!states.visible) {
      select.filteredOptionsCount--;
    }
  });

  return {
    select,
    currentLabel,
    currentValue,
    itemSelected,
    isDisabled,
    hoverItem,
  };
}
