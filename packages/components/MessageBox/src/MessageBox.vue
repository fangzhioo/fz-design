<template>
  <transition name="fade-in-linear" @after-leave="$emit('vanish')">
    <fz-overlay v-show="visible" :z-index="zIndex" :overlay-class="['is-message-box', modalClass]" :mask="modal">
      <div
        role="dialog"
        :aria-label="title"
        aria-modal="true"
        :aria-describedby="!showInput ? contentId : undefined"
        class="fz-overlay-message-box"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <fz-focus-trap loop :trapped="visible" :focus-trap-el="rootRef" :focus-start-el="focusStartRef" @release-requested="onCloseRequested">
          <div
            ref="rootRef"
            :class="['fz-message-box', customClass, { 'is-draggable': draggable, 'fz-message-box--center': center }]"
            :style="customStyle"
            tabindex="-1"
            @click.stop=""
          >
            <div v-if="title !== null && title !== undefined" ref="headerRef" class="fz-message-box__header">
              <div class="fz-message-box__title">
                <fz-icon v-if="iconComponent && center" :name="iconComponent" :class="['fz-message-box__status', typeClass]" />
                <span>{{ title }}</span>
              </div>
              <button
                v-if="showClose"
                type="button"
                class="fz-message-box__headerbtn"
                :aria-label="t('fz.messagebox.close')"
                @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
                @keydown.prevent.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
              >
                <fz-icon class="fz-message-box__close" name="close" />
              </button>
            </div>
            <div :id="contentId" class="fz-message-box__content">
              <div class="fz-message-box__container">
                <fz-icon v-if="iconComponent && !center && hasMessage" :name="iconComponent" :class="['fz-message-box__status', typeClass]" />
                <div v-if="hasMessage" class="fz-message-box__message">
                  <slot>
                    <component :is="showInput ? 'label' : 'p'" v-if="!dangerouslyUseHTMLString" :for="showInput ? inputId : undefined">
                      {{ !dangerouslyUseHTMLString ? message : '' }}
                    </component>
                    <component :is="showInput ? 'label' : 'p'" v-else :for="showInput ? inputId : undefined" v-html="message" />
                  </slot>
                </div>
              </div>
              <div v-show="showInput" class="fz-message-box__input">
                <fz-input
                  :id="inputId"
                  ref="inputRef"
                  v-model="inputValue"
                  :type="inputType"
                  :placeholder="inputPlaceholder"
                  :aria-invalid="validateError"
                  :class="{ invalid: validateError }"
                  @keydown.enter="handleInputEnter"
                />
                <div
                  class="fz-message-box__errormsg"
                  :style="{
                    visibility: !!editorErrorMessage ? 'visible' : 'hidden',
                  }"
                >
                  {{ editorErrorMessage }}
                </div>
              </div>
            </div>
            <div class="fz-message-box__btns">
              <fz-button
                v-if="showCancelButton"
                :loading="cancelButtonLoading"
                :class="[cancelButtonClass]"
                :round="roundButton"
                :size="btnSize"
                @click="handleAction('cancel')"
                @keydown.prevent.enter="handleAction('cancel')"
              >
                {{ cancelButtonText || t('fz.messagebox.cancel') }}
              </fz-button>
              <fz-button
                v-show="showConfirmButton"
                ref="confirmRef"
                type="primary"
                :loading="confirmButtonLoading"
                :class="[confirmButtonClasses]"
                :round="roundButton"
                :disabled="confirmButtonDisabled"
                :size="btnSize"
                @click="handleAction('confirm')"
                @keydown.prevent.enter="handleAction('confirm')"
              >
                {{ confirmButtonText || t('fz.messagebox.confirm') }}
              </fz-button>
            </div>
          </div>
        </fz-focus-trap>
      </div>
    </fz-overlay>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, ComponentPublicInstance, watch, nextTick, onMounted, onBeforeUnmount, toRefs } from 'vue';
import { TrapFocus } from '@fzui/directives';
import { Button, Icon, Input, Overlay, FocusTrap } from '@fzui/components';
import { messageBoxProps, messageBoxEmits, MessageBoxState, Action, TypeIconsMap } from './MessageBox';
import { useDraggable, useId, useLocale, useLockscreen, useRestoreActive, useSameTarget, useSize, useZIndex } from '@fzui/hooks';
import { off, on } from '@fzui/utils';

export default defineComponent({
  name: 'FzMessageBox',
  directives: {
    TrapFocus,
  },
  components: {
    FzButton: Button,
    FzIcon: Icon,
    FzInput: Input,
    FzOverlay: Overlay,
    FzFocusTrap: FocusTrap,
  },
  props: messageBoxProps,
  emits: messageBoxEmits,
  setup(props, { emit }) {
    // const popup = usePopup(props, doClose)
    const { t } = useLocale();
    const visible = ref(false);
    const { nextZIndex } = useZIndex();
    // s represents state
    const state = reactive<MessageBoxState>({
      beforeClose: null,
      callback: null,
      cancelButtonText: '',
      cancelButtonClass: '',
      confirmButtonText: '',
      confirmButtonClass: '',
      customClass: '',
      customStyle: {},
      dangerouslyUseHTMLString: false,
      distinguishCancelAndClose: false,
      icon: '',
      inputPattern: null,
      inputPlaceholder: '',
      inputType: 'text',
      inputValue: null,
      inputValidator: null,
      inputErrorMessage: '',
      message: null,
      modalFade: true,
      modalClass: '',
      showCancelButton: false,
      showConfirmButton: true,
      type: '',
      title: undefined,
      showInput: false,
      action: '' as Action,
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonDisabled: false,
      editorErrorMessage: '',
      // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
      // seemed ok for now without this state.
      // isOnComposition: false, // temporary remove
      validateError: false,
      zIndex: nextZIndex(),
    });

    const typeClass = computed(() => {
      const type = state.type;
      return { [`fz-message-box-icon--${type}`]: type && TypeIconsMap[type] };
    });

    const contentId = useId();
    const inputId = useId();

    const btnSize = useSize(
      computed(() => props.buttonSize),
      { prop: true, form: true, formItem: true },
    );

    const iconComponent = computed(() => state.icon || TypeIconsMap[state.type] || '');
    const hasMessage = computed(() => !!state.message);
    const rootRef = ref<HTMLElement>();
    const headerRef = ref<HTMLElement>();
    const focusStartRef = ref<HTMLElement>();
    const inputRef = ref<ComponentPublicInstance>();
    const confirmRef = ref<ComponentPublicInstance>();

    const confirmButtonClasses = computed(() => state.confirmButtonClass);

    watch(
      () => state.inputValue,
      async (val) => {
        await nextTick();
        if (props.boxType === 'prompt' && val !== null) {
          validate();
        }
      },
      { immediate: true },
    );

    watch(
      () => visible.value,
      (val) => {
        if (val) {
          if (props.boxType === 'alert' || props.boxType === 'confirm') {
            focusStartRef.value = confirmRef.value?.$el ?? rootRef.value;
          }
          state.zIndex = nextZIndex();
        }
        if (props.boxType !== 'prompt') return;
        if (val) {
          nextTick().then(() => {
            if (inputRef.value && inputRef.value.$el) {
              focusStartRef.value = getInputElement() ?? rootRef.value;
            }
          });
        } else {
          state.editorErrorMessage = '';
          state.validateError = false;
        }
      },
    );

    const draggable = computed(() => props.draggable);
    useDraggable(rootRef, headerRef, draggable);

    onMounted(async () => {
      await nextTick();
      if (props.closeOnHashChange) {
        on(window, 'hashchange', doClose);
      }
    });

    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        off(window, 'hashchange', doClose);
      }
    });

    function doClose() {
      if (!visible.value) return;
      visible.value = false;
      nextTick(() => {
        if (state.action) emit('action', state.action);
      });
    }

    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? 'close' : 'cancel');
      }
    };

    const overlayEvent = useSameTarget(handleWrapperClick);

    const handleInputEnter = (e: KeyboardEvent) => {
      if (state.inputType !== 'textarea') {
        e.preventDefault();
        return handleAction('confirm');
      }
    };

    const handleAction = (action: Action) => {
      if (props.boxType === 'prompt' && action === 'confirm' && !validate()) {
        return;
      }

      state.action = action;

      if (state.beforeClose) {
        state.beforeClose?.(action, state, doClose);
      } else {
        doClose();
      }
    };

    const validate = () => {
      if (props.boxType === 'prompt') {
        const inputPattern = state.inputPattern;
        if (inputPattern && !inputPattern.test(state.inputValue || '')) {
          state.editorErrorMessage = state.inputErrorMessage || t('fz.messagebox.error');
          state.validateError = true;
          return false;
        }
        const inputValidator = state.inputValidator;
        if (typeof inputValidator === 'function') {
          const validateResult = inputValidator(state.inputValue || '');
          if (validateResult === false) {
            state.editorErrorMessage = state.inputErrorMessage || t('fz.messagebox.error');
            state.validateError = true;
            return false;
          }
          if (typeof validateResult === 'string') {
            state.editorErrorMessage = validateResult;
            state.validateError = true;
            return false;
          }
        }
      }
      state.editorErrorMessage = '';
      state.validateError = false;
      return true;
    };

    const getInputElement = () => {
      const inputRefs = inputRef.value!.$refs;
      return (inputRefs.input || inputRefs.textarea) as HTMLElement;
    };

    const handleClose = () => {
      handleAction('close');
    };

    // when close on press escape is disabled, pressing esc should not callout
    // any other message box and close any other dialog-ish elements
    // e.g. Dialog has a close on press esc feature, and when it closes, it calls
    // props.beforeClose method to make a intermediate state by callout a message box
    // for some verification or alerting. then if we allow global event liek this
    // to dispatch, it could callout another message box.
    const onCloseRequested = () => {
      if (props.closeOnPressEscape) {
        handleClose();
      }
    };

    // locks the screen to prevent scroll
    if (props.lockScroll) {
      useLockscreen(visible);
    }

    // restore to prev active element.
    useRestoreActive(visible);

    return {
      ...toRefs(state),
      overlayEvent,
      visible,
      hasMessage,
      typeClass,
      contentId,
      inputId,
      btnSize,
      iconComponent,
      confirmButtonClasses,
      rootRef,
      focusStartRef,
      headerRef,
      inputRef,
      confirmRef,
      doClose, // for outside usage
      handleClose, // for out side usage
      onCloseRequested,
      handleWrapperClick,
      handleInputEnter,
      handleAction,
      t,
    };
  },
});
</script>
