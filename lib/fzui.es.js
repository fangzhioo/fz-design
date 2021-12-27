import { computed, getCurrentInstance, unref, ref, defineComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot, createCommentVNode } from "vue";
const useProp = (name) => {
  var _a;
  const vm = getCurrentInstance();
  const props = (_a = vm.proxy) == null ? void 0 : _a.$props;
  return computed(() => {
    var _a2;
    return (_a2 = props[name]) != null ? _a2 : void 0;
  });
};
const useSize = (fallback, ignore = {}) => {
  const emptyRef = ref(void 0);
  const size = ignore.prop ? emptyRef : useProp("size");
  return computed(() => size.value || unref(fallback) || "");
};
var index_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const buttonEmits = {
  click: (evt) => evt instanceof MouseEvent
};
const buttonProps = {
  size: {
    type: String,
    default: "medium"
  },
  type: {
    type: String,
    default: "default"
  },
  nativeType: {
    type: String,
    default: "button"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ""
  },
  loading: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  }
};
const _sfc_main$1 = defineComponent({
  name: "FzButton",
  props: buttonProps,
  emits: buttonEmits,
  setup(props, { slots, emit }) {
    const autoInsertSpace = computed(() => props.autoInsertSpace);
    const shouldAddSpace = computed(() => {
      var _a;
      const defaultSlot = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (autoInsertSpace.value && (defaultSlot == null ? void 0 : defaultSlot.length) === 1) {
        const slot = defaultSlot[0];
        if ((slot == null ? void 0 : slot.type) === Text) {
          const text = slot.children;
          return /^\p{Unified_Ideograph}{2}$/u.test(text);
        }
      }
      return false;
    });
    const buttonType = computed(() => props.type);
    const buttonSize = useSize();
    const buttonDisabled = computed(() => props.disabled);
    const buttonStyle = computed(() => {
      let styles = {};
      const buttonColor = props.color;
      if (buttonColor) {
        if (props.plain)
          ;
        else {
          styles = {
            "--fz-button-text-color": buttonColor
          };
        }
      }
      if (buttonDisabled.value)
        ;
      return styles;
    });
    const handleClick = (evt) => {
      if (props.nativeType === "reset")
        ;
      emit("click", evt);
    };
    return {
      shouldAddSpace,
      buttonType,
      buttonSize,
      buttonDisabled,
      buttonStyle,
      handleClick
    };
  }
});
const _hoisted_1$1 = ["disabled", "autofocus", "type"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    ref: "buttonRef",
    class: normalizeClass([
      "fz-button",
      _ctx.buttonType ? "fz-button--" + _ctx.buttonType : "",
      _ctx.buttonSize ? "fz-button--" + _ctx.buttonSize : "",
      {
        "is-disabled": _ctx.buttonDisabled,
        "is-loading": _ctx.loading,
        "is-plain": _ctx.plain,
        "is-round": _ctx.round,
        "is-circle": _ctx.circle
      }
    ]),
    disabled: _ctx.buttonDisabled || _ctx.loading,
    autofocus: _ctx.autofocus,
    type: _ctx.nativeType,
    style: normalizeStyle(_ctx.buttonStyle),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: normalizeClass({ "fz-button__text--expand": _ctx.shouldAddSpace })
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)) : createCommentVNode("", true)
  ], 14, _hoisted_1$1);
}
var Button = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const ButtonPlugin = {
  install(app) {
    app.component("FzButton", Button);
  }
};
const _sfc_main = defineComponent({
  name: "FzInput",
  setup(props, context) {
    return {};
  }
});
const _hoisted_1 = { class: "fz-input" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, " \u6211\u662F\u8F93\u5165\u6846\u7EC4\u4EF6 ");
}
var Input = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const InputPlugin = {
  install(app) {
    app.component("FzInput", Input);
  }
};
const FzUIPlugin = {
  install(app) {
    var _a, _b;
    (_a = ButtonPlugin.install) == null ? void 0 : _a.call(ButtonPlugin, app);
    (_b = InputPlugin.install) == null ? void 0 : _b.call(InputPlugin, app);
  }
};
export { Button, ButtonPlugin, Input, InputPlugin, FzUIPlugin as default };
