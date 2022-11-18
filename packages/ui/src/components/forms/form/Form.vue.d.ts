import Vue from 'vue';
/**
 * The Forge Form provides the following features:
 *
  - Automatic Loading state handling
  - Automatic error handling
  - Title Slot
  - Default Cancel and Submit button
 * @displayName Form
 **/
export declare const ForgeForm: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    loading: boolean;
    error: {
        hasError: boolean;
        message: string;
    };
}, {
    submit(): Promise<void>;
}, unknown, {
    onSubmit: Function;
    showTitle: boolean;
    title: string;
    hideCancel: boolean;
    submitText: string;
    loadingText: string;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeForm;
//# sourceMappingURL=Form.vue.d.ts.map