<template>
  <fz-tooltip
    ref="popper"
    v-model:visible="suggestionVisible"
    :placement="placement"
    :fallback-placements="['bottom-start', 'top-start']"
    :popper-class="`fz-autocomplete__popper ${popperClass}`"
    :gpu-acceleration="false"
    pure
    manual-mode
    effect="light"
    trigger="click"
    transition="fz-zoom-in-top"
    persistent
    @show="onSuggestionShow"
  >
    <div
      v-clickoutside="close"
      :class="['fz-autocomplete', $attrs.class]"
      :style="style"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="suggestionVisible"
      :aria-owns="id"
    >
      <fz-input
        ref="inputRef"
        v-bind="attrs"
        :model-value="modelValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="handleClear"
        @keydown.up.prevent="highlight(highlightedIndex - 1)"
        @keydown.down.prevent="highlight(highlightedIndex + 1)"
        @keydown.enter="handleKeyEnter"
        @keydown.tab="close"
      >
        <template v-if="$slots.prepend" #prepend>
          <slot name="prepend"></slot>
        </template>
        <template v-if="$slots.append" #append>
          <slot name="append"></slot>
        </template>
        <template v-if="$slots.prefix" #prefix>
          <slot name="prefix"></slot>
        </template>
        <template v-if="$slots.suffix" #suffix>
          <slot name="suffix"></slot>
        </template>
      </fz-input>
    </div>
    <template #content>
      <div
        ref="regionRef"
        :class="['fz-autocomplete-suggestion', suggestionLoading && 'is-loading']"
        :style="{ minWidth: dropdownWidth, outline: 'none' }"
        role="region"
      >
        <fz-scrollbar :id="id" tag="ul" wrap-class="fz-autocomplete-suggestion__wrap" view-class="fz-autocomplete-suggestion__list" role="listbox">
          <li v-if="suggestionLoading">
            <fz-icon class="is-loading" name="loading"></fz-icon>
          </li>
          <template v-else>
            <li
              v-for="(item, index) in suggestions"
              :id="`${id}-item-${index}`"
              :key="index"
              :class="{ highlighted: highlightedIndex === index }"
              role="option"
              :aria-selected="highlightedIndex === index"
              @click="select(item)"
            >
              <slot :item="item">{{ item[valueKey] }}</slot>
            </li>
          </template>
        </fz-scrollbar>
      </div>
    </template>
  </fz-tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUpdated, ref, StyleValue, watch } from 'vue';
import { Tooltip } from '@fzui/components/Tooltip';
import { Input, InputInstance } from '@fzui/components/Input';
import { Scrollbar } from '@fzui/components/Scrollbar';
import { Icon } from '@fzui/components/Icon';
import ClickOutside from '@fzui/directives/click-outside';
import { autocompleteEmits, autocompleteProps } from './Autocomplete';
import { useAttrs } from '@fzui/hooks';
import { generateUUID, isArray, throwError, debounce } from '@fzui/utils';
import type { RefElement } from '@fzui/utils';
import { UPDATE_MODEL_EVENT } from '@fzui/constants';

export default defineComponent({
  name: 'FzAutocomplete',
  components: {
    FzTooltip: Tooltip,
    FzInput: Input,
    FzScrollbar: Scrollbar,
    FzIcon: Icon,
  },
  directives: {
    clickoutside: ClickOutside,
  },
  inheritAttrs: false,
  props: autocompleteProps,
  emits: autocompleteEmits,
  setup(props, ctx) {
    const attrs = useAttrs();
    const suggestions = ref<any[]>([]);
    const highlightedIndex = ref(-1);
    const dropdownWidth = ref('');
    const activated = ref(false);
    const suggestionDisabled = ref(false);
    const loading = ref(false);
    const inputRef = ref<InputInstance | null>(null);
    const regionRef = ref<RefElement>(null);
    const popper = ref<any>(null);

    const id = computed(() => {
      return `fz-autocomplete-${generateUUID()}`;
    });
    const style = computed(() => ctx.attrs.style as StyleValue | undefined);
    const suggestionVisible = computed(() => {
      const isValidData = isArray(suggestions.value) && suggestions.value.length > 0;
      return (isValidData || loading.value) && activated.value;
    });
    const suggestionLoading = computed(() => {
      return !props.hideLoading && loading.value;
    });

    const onSuggestionShow = () => {
      nextTick(() => {
        if (suggestionVisible.value) {
          dropdownWidth.value = `${inputRef.value!.$el.offsetWidth}px`;
        }
      });
    };

    const updatePopperPosition = () => {
      nextTick(popper.value!.update);
    };

    watch(suggestionVisible, () => {
      dropdownWidth.value = `${inputRef.value!.$el.offsetWidth}px`;
    });

    onMounted(() => {
      (inputRef.value as any).ref!.setAttribute('role', 'textbox');
      (inputRef.value as any).ref!.setAttribute('aria-autocomplete', 'list');
      (inputRef.value as any).ref!.setAttribute('aria-controls', 'id');
      (inputRef.value as any).ref!.setAttribute('aria-activedescendant', `${id.value}-item-${highlightedIndex.value}`);

      const $ul = regionRef.value!.querySelector('.fz-autocomplete-suggestion__list');
      $ul!.setAttribute('role', 'listbox');
      $ul!.setAttribute('id', id.value);
    });

    onUpdated(updatePopperPosition);

    const getData = (queryString: string | number) => {
      if (suggestionDisabled.value) {
        return;
      }
      loading.value = true;
      updatePopperPosition();
      props.fetchSuggestions(queryString, (suggestionsArg) => {
        loading.value = false;
        if (suggestionDisabled.value) {
          return;
        }
        if (isArray(suggestionsArg)) {
          suggestions.value = suggestionsArg;
          highlightedIndex.value = props.highlightFirstItem ? 0 : -1;
        } else {
          throwError('FzAutocomplete', 'autocomplete suggestions must be an array');
        }
      });
    };
    const debouncedGetData = debounce(getData, props.debounce);

    const close = () => {
      activated.value = false;
    };
    const focus = () => {
      inputRef.value!.focus();
    };
    const select = (item: Record<string, any>) => {
      ctx.emit('input', item[props.valueKey]);
      ctx.emit(UPDATE_MODEL_EVENT, item[props.valueKey]);
      ctx.emit('select', item);
      nextTick(() => {
        suggestions.value = [];
        highlightedIndex.value = -1;
      });
    };
    const highlight = (idx: number) => {
      let index = idx;
      if (!suggestionVisible.value || loading.value) {
        return;
      }
      if (index < 0) {
        highlightedIndex.value = -1;
        return;
      }
      if (index >= suggestions.value.length) {
        index = suggestions.value.length - 1;
      }
      const suggestion = regionRef.value!.querySelector('.fz-autocomplete-suggestion__wrap');
      if (!suggestion) {
        return;
      }
      const suggestionList = suggestion.querySelectorAll('.fz-autocomplete-suggestion__list li');
      const highlightItem = suggestionList[index];
      const scrollTop = suggestion.scrollTop;
      const { offsetTop, scrollHeight } = highlightItem as HTMLElement;

      if (offsetTop + scrollHeight > scrollTop + suggestion.clientHeight) {
        suggestion.scrollTop += scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= scrollHeight;
      }
      highlightedIndex.value = index;

      (inputRef.value as any).ref!.setAttribute('aria-activedescendant', `${id.value}-item-${highlightedIndex.value}`);
    };

    const handleInput = (value: string | number) => {
      ctx.emit('input', value);
      ctx.emit(UPDATE_MODEL_EVENT, value);
      suggestionDisabled.value = false;
      if (!props.triggerOnFocus && !value) {
        suggestionDisabled.value = true;
        suggestions.value = [];
        return;
      }
      debouncedGetData(value);
    };
    const handleChange = (value: string | number) => {
      ctx.emit('change', value);
    };
    const handleFocus = (e: FocusEvent) => {
      activated.value = true;
      ctx.emit('focus', e);
      if (props.triggerOnFocus) {
        debouncedGetData(props.modelValue);
      }
    };
    const handleBlur = (e: FocusEvent) => {
      ctx.emit('blur', e);
    };
    const handleClear = () => {
      activated.value = false;
      ctx.emit(UPDATE_MODEL_EVENT, '');
      ctx.emit('clear');
    };
    const handleKeyEnter = () => {
      if (suggestionVisible.value && highlightedIndex.value >= 0 && highlightedIndex.value < suggestions.value.length) {
        select(suggestions.value[highlightedIndex.value]);
      } else if (props.selectWhenUnmatched) {
        ctx.emit('select', { value: props.modelValue });
        nextTick(() => {
          suggestions.value = [];
          highlightedIndex.value = -1;
        });
      }
    };

    return {
      attrs,
      suggestions,
      highlightedIndex,
      dropdownWidth,
      activated,
      suggestionDisabled,
      loading,
      inputRef,
      regionRef,
      popper,

      id,
      style,
      suggestionVisible,
      suggestionLoading,
      onSuggestionShow,

      getData,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear,
      handleKeyEnter,
      close,
      focus,
      select,
      highlight,
    };
  },
});
</script>
