<template>
  <div class="forge-filter-header">
    <label class="pl-2" :class="{ 'forge-filter-header-hidden': hideLabel }">{{ name }} </label>
    <div @click.stop.prevent class="d-flex justify-content-between align-items-center position-relative">
      <b-form-input
        v-if="type == 'number'"
        :value="value"
        @update="update"
        type="number"
        :debounce="debounceTimer"
        :placeholder="placeHolderText"
        :class="{ 'input-no-spinner': hideSpinnerWheel }"
        v-bind="$attrs"
      />

      <b-form-input
        v-else-if="type == 'string'"
        :value="value"
        @update="update"
        type="text"
        :debounce="debounceTimer"
        :placeholder="placeHolderText"
        v-bind="$attrs"
      />

      <forge-multiselect
        v-else-if="type == 'select'"
        :value="value"
        :multiple="false"
        :options="options"
        @input="update"
        :variant="variant"
        v-bind="$attrs"
        style="width: 100%"
      />

      <forge-multiselect
        v-else-if="type == 'multiSelect'"
        :multiple="true"
        :value="multiSelectValue"
        :searchable="true"
        :options="options"
        @input="update"
        select-label="Add"
        deselect-label="Remove"
        :variant="variant"
        v-bind="$attrs"
        style="width: 100%"
      />

      <forge-date-picker
        v-else-if="type == 'date'"
        :value="value"
        @input="update"
        :config="{
          altInput: true,
          dateFormat: 'Y-m-d',
          altFormat: 'd/m/Y',
          enableTime: 'false',
          ...config
        }"
        v-on="$listeners"
        :placeholder="placeHolderText"
        :hide-calendar-icon="value && value.length > 0 ? true : false"
        @reset="reset"
        :variant="variant"
        v-bind="$attrs"
      />

      <forge-date-picker
        v-else-if="type == 'dateRange'"
        :value="value"
        @on-change="updateDateRange"
        :config="{
          mode: 'range',
          altInput: true,
          dateFormat: 'Y-m-d',
          altFormat: 'd/m/Y',
          enableTime: 'false',
          ...config
        }"
        v-on="$listeners"
        :hide-calendar-icon="value && value.length > 0 ? true : false"
        @reset="reset"
        :placeholder="placeHolderText"
        :variant="variant"
        v-bind="$attrs"
      />

      <forge-date-picker
        v-else-if="type == 'time'"
        :value="value"
        @input="update"
        :config="{
          noCalendar: true,
          enableTime: true,
          time_24hr: true,
          dateFormat: 'H:i',
          ...config
        }"
        v-on="$listeners"
        :placeholder="placeHolderText"
        :hide-calendar-icon="value && value.length > 0 ? true : false"
        @reset="reset"
        :variant="variant"
        v-bind="$attrs"
      />

      <b-icon-x-circle tabindex="0" class="search-clear-icon" v-if="renderClearButton" @keypress.enter="reset" @click="reset" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { BIconXCircle, BFormInput } from "bootstrap-vue";
import ForgeDatePicker from "../../forms/date-picker/DatePicker.vue";
import ForgeMultiselect from "../../forms/multiselect/MultiSelect.vue";

/**
 * @displayName Filter Header
 **/
export const ForgeFilterHeader = /*#__PURE__*/ defineComponent({
  name: "ForgeFilterHeader",
  components: { BIconXCircle, BFormInput, ForgeDatePicker, ForgeMultiselect },
  props: {
    /**
     * The name to use in the input and label
     */
    name: {
      type: String,
      required: false,
      default: null
    },
    /**
     * The type of filter that should be used for the header
     */
    type: {
      type: String,
      required: true,
      default: "string",
      validator(value: string) {
        return ["string", "number", "select", "multiSelect", "date", "dateRange", "time"].indexOf(value) !== -1;
      }
    },
    value: {
      type: [String, Array, Object, Number],
      required: false,
      default: null
    },
    options: {
      type: Array,
      required: false,
      default: function () {
        return [];
      }
    },
    /** How long to wait before actually searching, better for server side searching where you don't want to search each keypress */
    debounceTimer: {
      type: Number,
      default: 750
    },
    config: {
      type: Object,
      default: () => {}
    },
    variant: {
      type: String,
      default: () => Vue.prototype?.ForgeSettings?.FilterHeader?.variant ?? "primary"
    },
    placeholder: {
      type: String,
      default: null
    },
    hideLabel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    update(value: string | any[] | null) {
      switch (this.type) {
        case "mulitSelect":
          this.$emit("input", this.multiSelectValue);
          break;
        default: {
          this.$emit("input", value ? (this.type === "number" && typeof value === "string" ? parseFloat(value) : value) : null);
          break;
        }
      }
    },
    updateDateRange(selectedDates: Date[], _dateStr: string, instance: any) {
      let canUpdate = this.value?.length !== selectedDates.length;

      for (let i = 0; i < selectedDates.length; ++i) {
        canUpdate = canUpdate || selectedDates[i].getTime() !== this.value[i]?.getTime();
      }

      if ((selectedDates.length === 0 || selectedDates.length === 2) && canUpdate) {
        this.update(selectedDates);
        instance.close();
      }
    },
    reset() {
      if (this.value != null) {
        this.update(null);
        this.$emit("reset");
      }
    }
  },
  computed: {
    dateValue(): string {
      if (this.value?.length === 2) {
        return `${this.value[0]} to ${this.value[1]}`;
      } else {
        return "";
      }
    },
    multiSelectValue(): any[] {
      if (this.type == "multiSelect" && !this.value) {
        return [];
      } else {
        return this.value as [];
      }
    },
    renderClearButton(): boolean {
      return (
        this.type != "select" &&
        this.type != "multiSelect" &&
        ((this.type == "dateRange" && this.value?.length > 0) || (this.value != null && this.type != "dateRange"))
      );
    },
    placeHolderText(): string {
      return this.placeholder || this.name;
    },
    hideSpinnerWheel(): boolean {
      return !!this.$attrs.noWheel || this.$attrs["no-wheel"] !== undefined;
    }
  }
});

export default ForgeFilterHeader;
</script>
