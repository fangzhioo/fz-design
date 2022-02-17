<template>
  <div ref="selectWrapper" v-click-outside:[popperPaneRef]="handleClose" :class="wrapperKls" @click.stop="toggleMenu">
    <fz-tooltip
      ref="tooltipRef"
      v-model:visible="dropMenuVisible"
      placement="bottom-start"
      :popper-class="['fz-select__popper', popperClass]"
      :fallback-placements="['bottom-start', 'top-start', 'right', 'left']"
      effect="light"
      pure
      trigger="click"
      transition="fz-zoom-in-top"
      :stop-popper-mouse-event="false"
      :gpu-acceleration="false"
      persistent
      @show="handleMenuEnter"
    >
      <template #default>
        <div class="select-trigger">
          <div v-if="multiple" ref="tags" class="fz-select__tags" :style="selectTagsStyle">
            <span class="fz-select__tags__wrap" v-if="collapseTags && selected.length">
              <fz-tag
                :closable="!selectDisabled && !selected[0].isDisabled"
                :size="collapseTagSize"
                :hit="selected[0].hitState"
                :type="tagType"
                disable-transitions
                @close="deleteTag($event, selected[0])"
              >
                <span class="fz-select__tags-text" :style="{ maxWidth: inputWidth - 123 + 'px' }">{{ selected[0].currentLabel }}</span>
              </fz-tag>
              <fz-tag v-if="selected.length > 1" :closable="false" :size="collapseTagSize" :type="tagType" disable-transitions>
                <span class="fz-select__tags-text">+ {{ selected.length - 1 }}</span>
              </fz-tag>
            </span>
            <!-- <div> -->
            <transition v-if="!collapseTags" @after-leave="resetInputHeight">
              <span
                class="fz-select__tags__wrap"
                :style="{
                  marginLeft: prefixWidth && selected.length ? `${prefixWidth}px` : undefined,
                }"
              >
                <fz-tag
                  v-for="item in selected"
                  :key="getValueKey(item)"
                  :closable="!selectDisabled && !item.isDisabled"
                  :size="collapseTagSize"
                  :hit="item.hitState"
                  :type="tagType"
                  disable-transitions
                  @close="deleteTag($event, item)"
                >
                  <span class="fz-select__tags-text" :style="{ maxWidth: inputWidth - 75 + 'px' }">{{ item.currentLabel }}</span>
                </fz-tag>
              </span>
            </transition>
            <!-- </div> -->
            <input
              v-if="filterable"
              ref="input"
              v-model="query"
              type="text"
              :class="['fz-select__input', `is-${selectSize}`]"
              :disabled="selectDisabled"
              :autocomplete="autocomplete"
              :style="{
                marginLeft: (prefixWidth && !selected.length) || tagInMultiLine ? `${prefixWidth}px` : undefined,
                flexGrow: 1,
                width: `${inputLength / (inputWidth - 32)}%`,
                maxWidth: `${inputWidth - 42}px`,
              }"
              @focus="handleFocus"
              @blur="handleBlur"
              @keyup="managePlaceholder"
              @keydown="resetInputState"
              @keydown.down.prevent="navigateOptions('next')"
              @keydown.up.prevent="navigateOptions('prev')"
              @keydown.esc.stop.prevent="visible = false"
              @keydown.enter.stop.prevent="selectOption"
              @keydown.delete="deletePrevTag"
              @keydown.tab="visible = false"
              @compositionstart="handleComposition"
              @compositionupdate="handleComposition"
              @compositionend="handleComposition"
              @input="debouncedQueryChange"
            />
          </div>
          <fz-input
            :id="id"
            ref="reference"
            v-model="selectedLabel"
            type="text"
            :placeholder="currentPlaceholder"
            :name="name"
            :autocomplete="autocomplete"
            :size="selectSize"
            :disabled="selectDisabled"
            :readonly="readonly"
            :validate-event="false"
            :class="{ 'is-focus': visible }"
            :tabindex="multiple && filterable ? -1 : undefined"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="debouncedOnInputChange"
            @paste="debouncedOnInputChange"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @keydown.down.stop.prevent="navigateOptions('next')"
            @keydown.up.stop.prevent="navigateOptions('prev')"
            @keydown.enter.stop.prevent="selectOption"
            @keydown.esc.stop.prevent="visible = false"
            @keydown.tab="visible = false"
            @mouseenter="inputHovering = true"
            @mouseleave="inputHovering = false"
          >
            <template v-if="$slots.prefix" #prefix>
              <div style="height: 100%; display: flex; justify-content: center; align-items: center">
                <slot name="prefix"></slot>
              </div>
            </template>
            <template #suffix>
              <fz-icon v-if="iconComponent" :name="iconComponent" v-show="!showClose" class="fz-select__caret fz-select__icon" :class="[iconReverse]" />
              <fz-icon v-if="showClose && clearIcon" :name="clearIcon" class="fz-select__caret fz-select__icon" @click="handleClearClick" />
            </template>
          </fz-input>
        </div>
      </template>
      <template #content>
        <fz-select-menu>
          <fz-scrollbar
            v-show="options.size > 0 && !loading"
            ref="scrollbar"
            tag="ul"
            wrap-class="fz-select-dropdown__wrap"
            view-class="fz-select-dropdown__list"
            :class="[{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }]"
          >
            <fz-option v-if="showNewOption" :value="query" :created="true" />
            <slot></slot>
          </fz-scrollbar>
          <template v-if="emptyText && (!allowCreate || loading || (allowCreate && options.size === 0))">
            <slot v-if="$slots.empty" name="empty"></slot>
            <p v-else class="fz-select-dropdown__empty">
              {{ emptyText }}
            </p>
          </template>
        </fz-select-menu>
      </template>
    </fz-tooltip>
  </div>
</template>

<script lang="ts">
import { toRefs, defineComponent, onMounted, nextTick, reactive, provide, computed, unref } from 'vue';
import { ClickOutside } from '@fzui/directives';
import { useFocus, useLocale } from '@fzui/hooks';
import { useResizeObserver } from '@vueuse/core';
import { Icon } from '@fzui/components/Icon';
import { Tooltip } from '@fzui/components/Tooltip';
import { Scrollbar } from '@fzui/components/Scrollbar';
import { Tag } from '@fzui/components/Tag';
import SelectOption from './SelectOption.vue';
import SelectDropdown from './SelectDropdown.vue';
import { Input } from '@fzui/components/Input';
import { useSelect, useSelectStates } from './hooks/useSelect';
import { selectEmits, selectProps, SelectContext, SelectSize } from './Select';
import { FZ_SELECT_INJECT_KEY, UPDATE_MODEL_EVENT } from '@fzui/constants';

const COMPONENT_NAME = 'FzSelect';
export default defineComponent({
  name: COMPONENT_NAME,
  components: {
    FzInput: Input,
    FzSelectMenu: SelectDropdown,
    FzOption: SelectOption,
    FzTag: Tag,
    FzScrollbar: Scrollbar,
    FzTooltip: Tooltip,
    FzIcon: Icon,
  },
  directives: { ClickOutside },
  props: selectProps,
  emits: selectEmits,
  setup(props, ctx) {
    const { t } = useLocale();
    const states = useSelectStates(props);
    const {
      optionsArray,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      setSelected,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconComponent,
      iconReverse,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
      onOptionCreate,
      onOptionDestroy,
      handleMenuEnter,
      handleFocus,
      blur,
      handleBlur,
      handleClearClick,
      handleClose,
      toggleMenu,
      selectOption,
      getValueKey,
      navigateOptions,
      dropMenuVisible,

      reference,
      input,
      tooltipRef,
      tags,
      selectWrapper,
      scrollbar,
      queryChange,
      groupQueryChange,
    } = useSelect(props, states, ctx);

    const { focus } = useFocus(reference);

    const {
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      cachedOptions,
      optionsCount,
      prefixWidth,
      tagInMultiLine,
    } = toRefs(states);

    const wrapperKls = computed(() => {
      const classList = ['fz-select', `fz-select--${unref(selectSize)}`];
      if (props.disabled) {
        classList.push('fz-select--disabled');
      }
      return classList;
    });

    const selectTagsStyle = computed(() => ({
      maxWidth: `${unref(inputWidth) - 32}px`,
      width: '100%',
    }));

    provide(
      FZ_SELECT_INJECT_KEY,
      reactive({
        props,
        options,
        optionsArray,
        cachedOptions,
        optionsCount,
        filteredOptionsCount,
        hoverIndex,
        handleOptionSelect,
        onOptionCreate,
        onOptionDestroy,
        selectWrapper,
        selected,
        setSelected,
        queryChange,
        groupQueryChange,
      }) as unknown as SelectContext,
    );

    onMounted(() => {
      if (props.placeholder) {
        states.cachedPlaceHolder = currentPlaceholder.value = props.placeholder;
      }
      if (props.multiple && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
        currentPlaceholder.value = '';
      }
      useResizeObserver(selectWrapper.value, handleResize);

      if (reference.value && reference.value.$el) {
        const sizeMap: Record<SelectSize, number> = {
          large: 36,
          medium: 32,
          small: 28,
          mini: 24,
        };
        const input = reference.value.input as HTMLInputElement;
        if (selectSize.value) {
          states.initialInputHeight = input.getBoundingClientRect().height || sizeMap[selectSize.value];
        }
      }
      if (props.remote && props.multiple) {
        resetInputHeight();
      }
      nextTick(() => {
        if (!reference.value) {
          return;
        }
        if (reference.value.$el) {
          inputWidth.value = reference.value.$el.getBoundingClientRect().width;
        }
        if (ctx.slots.prefix) {
          const inputChildNodes = reference.value.$el.childNodes;
          const input = (Array.from(inputChildNodes) as HTMLElement[]).filter((item) => item.tagName === 'INPUT')[0];
          const prefix = reference.value.$el.querySelector('.fz-input__prefix');
          prefixWidth.value = Math.max(prefix.getBoundingClientRect().width + 5, 30);
          if (states.prefixWidth) {
            input.style.paddingLeft = `${Math.max(states.prefixWidth, 30)}px`;
          }
        }
      });
      setSelected();
    });

    if (props.multiple && !Array.isArray(props.modelValue)) {
      ctx.emit(UPDATE_MODEL_EVENT, []);
    }
    if (!props.multiple && Array.isArray(props.modelValue)) {
      ctx.emit(UPDATE_MODEL_EVENT, '');
    }

    const popperPaneRef = computed(() => {
      return tooltipRef.value?.popperRef?.contentRef;
    });

    return {
      tagInMultiLine,
      prefixWidth,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconComponent,
      iconReverse,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
      handleMenuEnter,
      handleFocus,
      blur,
      handleBlur,
      handleClearClick,
      handleClose,
      toggleMenu,
      selectOption,
      getValueKey,
      navigateOptions,
      dropMenuVisible,
      focus,

      reference,
      input,
      tooltipRef,
      popperPaneRef,
      tags,
      selectWrapper,
      scrollbar,

      wrapperKls,
      selectTagsStyle,
    };
  },
});
</script>
