import Vue from 'vue';
import { ForgeDatePickerNormalizer } from '../../../helpers';
/**
 * @displayName Date Picker
 */
export declare const ForgeDatePicker: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    fpInstance: import("flatpickr/dist/types/instance").Instance;
    fpDefaultConfig: Partial<import("flatpickr/dist/types/options").BaseOptions>;
}, {
    /**
     * Update v-model on <input> value change
     */
    onInput(): void;
    datesEqual(d1: Date | null, d2: Date | null): boolean;
}, {
    staticMountEl: HTMLElement;
    mergedConfig: Partial<import("flatpickr/dist/types/options").BaseOptions>;
    fpEl: HTMLInputElement;
    fpSingle: boolean;
    fpValue: Date | Date[];
    theme: string[];
}, {
    value: any;
    config: Partial<import("flatpickr/dist/types/options").BaseOptions>;
    normalizer: ForgeDatePickerNormalizer<string> | ForgeDatePickerNormalizer<unknown>;
    state: boolean;
    variant: any;
    hideCalendarIcon: any;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeDatePicker;
