import Vue from 'vue';
/**
 * @displayName MultiSelect
 **/
export declare const ForgeMultiSelect: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    selectAllHighlighted: boolean;
    isAllSelected: boolean;
}, {
    testFunc(values: any[] | Record<string, any>): void;
    onMouseOver(): void;
    onMouseLeave(): void;
    clearSelected(): void;
    toggleSelectAll(): void;
    checkAllSelected(event: any[]): void;
    selectAll(): void;
}, {
    theme: string;
    multiSelectDefaults: object;
    shouldShowClearSelection: boolean;
    mergedListeners: Object;
    mergedAttrs: any;
    optionHighlight: string;
}, {
    variant: any;
    state: boolean;
    showSelectAll: boolean;
    showClearSelection: boolean;
    expandLeft: boolean;
    selectValue: string;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeMultiSelect;
