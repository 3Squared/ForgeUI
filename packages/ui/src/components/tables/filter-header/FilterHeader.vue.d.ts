import Vue from 'vue';
/**
 * @displayName Filter Header
 **/
export declare const ForgeFilterHeader: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, unknown, {
    update(value: string | any[] | null): void;
    updateDateRange(selectedDates: Date[], _dateStr: string, instance: any): void;
    reset(): void;
}, {
    dateValue: string;
    multiSelectValue: any[];
    renderClearButton: boolean;
    placeHolderText: string;
    hideSpinnerWheel: boolean;
}, {
    name: string;
    type: string;
    value: any;
    options: unknown[];
    debounceTimer: number;
    config: any;
    variant: any;
    placeholder: string;
    hideLabel: boolean;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeFilterHeader;
//# sourceMappingURL=FilterHeader.vue.d.ts.map