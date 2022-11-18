import r from "vue";
import { BIconCalendar3 as f } from "bootstrap-vue";
import p from "flatpickr";
import { kebabToCamel as u } from "../../../helpers/forge-ui.mjs";
import { stringNormalizer as c } from "../../../helpers/forge-ui5.mjs";
import { HtmlBooleanAttributes as h, IgnoredVueEvents as m } from "./forge-ui3.mjs";
const E = /* @__PURE__ */ r.extend({
  name: "ForgeDatePicker",
  components: { BIconCalendar3: f },
  data() {
    return {
      fpInstance: {},
      fpDefaultConfig: {
        dateFormat: "Z"
      }
    };
  },
  props: {
    value: {
      type: [Object, String, Array, Date],
      default: null
    },
    config: {
      type: Object,
      default: () => ({})
    },
    normalizer: {
      type: Object,
      default: () => c
    },
    state: {
      type: Boolean,
      default: null
    },
    variant: {
      type: String,
      default: () => {
        var t, e, a, i;
        return (i = (a = (e = (t = r.prototype) == null ? void 0 : t.ForgeSettings) == null ? void 0 : e.DatePicker) == null ? void 0 : a.variant) != null ? i : "primary";
      }
    },
    hideCalendarIcon: {
      type: Boolean,
      default: () => {
        var t, e, a, i;
        return (i = (a = (e = (t = r.prototype) == null ? void 0 : t.ForgeSettings) == null ? void 0 : e.DatePicker) == null ? void 0 : a.hideCalendarIcon) != null ? i : !1;
      }
    }
  },
  methods: {
    onInput() {
      const t = this.fpSingle ? this.normalizer.fromNative(this.fpValue) : this.fpValue.map(this.normalizer.fromNative);
      this.$emit("input", t);
    },
    datesEqual(t, e) {
      return (t == null ? void 0 : t.getTime()) === (e == null ? void 0 : e.getTime());
    }
  },
  computed: {
    staticMountEl() {
      const t = "flatpickr-calendar-static-mount";
      let e = document.getElementById(t);
      return e || (e = document.createElement("div"), e.id = t, this.$root.$el.appendChild(e));
    },
    mergedConfig() {
      const t = this.config.static ? this.staticMountEl : void 0;
      return {
        ...this.config,
        wrap: !0,
        static: !1,
        appendTo: t,
        onClose: (e, a, i, s) => {
          i.setDate(a), this.onInput(), this.$emit("on-close", e, a, i, s);
        }
      };
    },
    fpEl() {
      var t;
      return (t = this.fpInstance.altInput) != null ? t : this.fpInstance.input;
    },
    fpSingle() {
      return this.fpInstance.config.mode === "single";
    },
    fpValue() {
      var t;
      return this.fpSingle ? (t = this.fpInstance.selectedDates[0]) != null ? t : null : this.fpInstance.selectedDates;
    },
    theme() {
      return [`forge-date-picker-${this.variant}`];
    }
  },
  watch: {
    value() {
      var a, i;
      let t = !1, e;
      this.fpSingle ? (e = this.normalizer.toNative(this.value), t = !this.datesEqual(e, this.fpValue)) : (e = (i = (a = this.value) == null ? void 0 : a.map(this.normalizer.toNative)) != null ? i : null, t = Array.isArray(e) ? e.some((s, n) => {
        var o, l;
        return !this.datesEqual(s, (l = (o = this.fpValue) == null ? void 0 : o[n]) != null ? l : null);
      }) : e !== this.fpValue), t && this.fpInstance.setDate(e, !0);
    },
    options: {
      deep: !0,
      handler() {
        this.fpInstance.set(this.mergedConfig);
      }
    },
    state() {
      this.fpEl.classList[this.state === !1 ? "add" : "remove"]("is-invalid");
    },
    $attrs: {
      handler() {
        for (const [t, e] of Object.entries(this.$attrs))
          h.includes(t.toLowerCase()) ? e ? this.fpEl.setAttribute(t, t) : this.fpEl.removeAttribute(t) : this.fpEl.setAttribute(t, e);
      }
    }
  },
  mounted() {
    var a;
    const t = Array.isArray(this.value) ? this.value.map(this.normalizer.toNative) : (a = this.normalizer.toNative(this.value)) != null ? a : void 0, e = {
      ...this.fpDefaultConfig,
      defaultDate: t,
      ...this.mergedConfig
    };
    for (const [i, s] of Object.entries(this.$listeners)) {
      if (m.includes(i))
        continue;
      let n = u((i.startsWith("on-") ? "" : "on-") + i);
      Object.assign(e, { [n]: s });
    }
    this.fpInstance = p(this.$el, e), this.fpInstance.calendarContainer.classList.add(`flatpickr-calendar--${this.variant}`);
  }
});
export {
  E as ForgeDatePicker,
  E as default
};
