<template>
  <div class="d-flex align-items-center forge-date-picker" :class="{ 'is-invalid': state === false }">
    <div class="order-0 flex-shrink-0">
      <!-- @slot Content placed before the Date Picker -->
      <slot name="before" />
    </div>

    <input type="text" class="form-control flatpickr-input order-1" v-bind="$attrs" @input="onInput" data-input />

    <div v-if="!hideCalendarIcon" class="order-2">
      <b-icon-calendar3 class="forge-date-picker-icon ml-2" :variant="variant" data-toggle />
    </div>

    <div class="order-3 flex-shrink-0">
      <!-- @slot Content placed after the Date Picker -->
      <slot name="after" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { BIconCalendar3 } from 'bootstrap-vue';
import flatpickr from 'flatpickr';
import { ForgeDatePickerNormalizer, kebabToCamel } from '../../../helpers/index';
import { stringNormalizer } from '@/helpers/date-picker-normalizers';
import { HtmlBooleanAttributes, IgnoredVueEvents } from './helpers';

type Config = flatpickr.Options.Options;

/**
 * @displayName Date Picker
 */
export const ForgeDatePicker = /*#__PURE__*/ Vue.extend({
  name: 'ForgeDatePicker',
  components: { BIconCalendar3 },
  data() {
    return {
      fpInstance: {} as flatpickr.Instance,

      fpDefaultConfig: {
        dateFormat: 'Z'
      } as Config
    };
  },

  props: {
    /**
     * Date class differentiates with normalizer
     * Component is written with a normalizer to `string` for backwards compatability
     */
    value: {
      type: [Object, String, Array, Date],
      default: null
    },

    /**
     * Flatpickr configuration options
     * @type {flatpickr.Options.Options}
     */
    config: {
      type: Object as PropType<Config>,
      default: () => ({} as Config)
    },

    /**
     * Converts library date instances to native Javascript Date objects
     * @type {ForgeDatePickerNormalizer}
     */
    normalizer: {
      type: Object as <T>() => ForgeDatePickerNormalizer<T>,
      default: () => stringNormalizer
    },

    /**
     * When set to false will show a validation icon similar to boostrap form controls
     */
    state: {
      type: Boolean,
      default: null
    },

    /**
     * One of the standard theme variants e.g primary, secondary, brand
     */
    variant: {
      type: String,
      default: () => Vue.prototype?.ForgeSettings?.DatePicker?.variant ?? 'primary'
    },

    /**
     * Hides the calendar icon and expands the input field
     */
    hideCalendarIcon: {
      type: Boolean,
      default: () => Vue.prototype?.ForgeSettings?.DatePicker?.hideCalendarIcon ?? false
    }
  },

  methods: {
    /**
     * Update v-model on <input> value change
     */
    onInput() {
      const normalizedValue = this.fpSingle ? this.normalizer.fromNative(this.fpValue as Date) : (this.fpValue as Date[]).map(this.normalizer.fromNative);

      this.$emit('input', normalizedValue);
    },

    datesEqual(d1: Date | null, d2: Date | null) {
      return d1?.getTime() === d2?.getTime();
    }
  },

  computed: {
    staticMountEl(): HTMLElement {
      const id = 'flatpickr-calendar-static-mount';
      let el = document.getElementById(id);

      if (el) {
        return el;
      }

      el = document.createElement('div');
      el.id = id;
      return this.$root.$el.appendChild(el);
    },
    mergedConfig(): Config {
      const appendTo = this.config.static ? this.staticMountEl : undefined;
      return {
        ...this.config,
        wrap: true,
        static: false,
        appendTo,
        onClose: (dates, currentDateString: string, instance, data) => {
          instance.setDate(currentDateString);
          this.onInput();

          /**
           * Triggers when the number changes
           *
           * @property {Date[]} dates new value set
           * @property {string} currentDateString value that was set before the change
           * @property {string} currentDateString value that was set before the change
           * @property {any} data value that was set before the change
           */
          this.$emit('on-close', dates, currentDateString, instance, data);
        }
      };
    },

    /**
     * When using `altInput`, Flatpickr mounts hidden input
     */
    fpEl(): HTMLInputElement {
      return this.fpInstance.altInput ?? this.fpInstance.input;
    },

    fpSingle(): boolean {
      return this.fpInstance.config.mode === 'single';
    },

    fpValue(): Date | Date[] {
      return this.fpSingle ? this.fpInstance.selectedDates[0] ?? null : this.fpInstance.selectedDates;
    },

    theme(): string[] {
      return [`forge-date-picker-${this.variant}`];
    }
  },

  // Apply prop changes to Flatpickr instance
  watch: {
    value() {
      let shouldUpdate = false;
      let nativeValue;

      if (this.fpSingle) {
        nativeValue = this.normalizer.toNative(this.value as string | null);
        shouldUpdate = !this.datesEqual(nativeValue, this.fpValue as Date | null);
      } else {
        nativeValue = (this.value as string[] | null)?.map(this.normalizer.toNative) ?? null;

        shouldUpdate = Array.isArray(nativeValue)
          ? nativeValue.some((date: Date | null, i) => !this.datesEqual(date, (this.fpValue as Date[] | null)?.[i] ?? null))
          : nativeValue !== this.fpValue;
      }

      shouldUpdate && this.fpInstance.setDate(nativeValue as Date | Date[], true); // Trigger event handlers
    },

    options: {
      deep: true,
      handler() {
        this.fpInstance.set(this.mergedConfig);
      }
    },

    state() {
      this.fpEl.classList[this.state === false ? 'add' : 'remove']('is-invalid');
    },

    ['$attrs']: {
      handler() {
        for (const [key, value] of Object.entries(this.$attrs)) {
          // Add/remove boolean attributes
          if (HtmlBooleanAttributes.includes(key.toLowerCase())) {
            if (value) {
              this.fpEl.setAttribute(key, key);
            } else {
              this.fpEl.removeAttribute(key);
            }
          } else {
            this.fpEl.setAttribute(key, value);
          }
        }
      }
    }
  },

  mounted() {
    const defaultDate = Array.isArray(this.value)
      ? (this.value.map(this.normalizer.toNative) as Date[]) // assertion required for flatpickr type
      : this.normalizer.toNative(this.value) ?? undefined; // coaslesce required for flatpickr type

    const options: Config = {
      ...this.fpDefaultConfig,
      defaultDate,
      ...this.mergedConfig
    };

    // Map Flatpickr events, remove  on` prefix as redundant with `v-on:` directives
    // Note: events cannot be reassigned by parent iwht Flatpickr
    for (const [eventName, eventFunc] of Object.entries(this.$listeners)) {
      if (IgnoredVueEvents.includes(eventName)) {
        continue;
      }

      // Backwards compatability
      // Warn v-on directives prefixed with 'on-' prefix
      let resolvedName = kebabToCamel((!eventName.startsWith('on-') ? 'on-' : '') + eventName);

      Object.assign(options, { [resolvedName]: eventFunc });
    }
    this.fpInstance = flatpickr(this.$el, options);

    this.fpInstance.calendarContainer.classList.add(`flatpickr-calendar--${this.variant}`);
  }
});

export default ForgeDatePicker;
</script>
