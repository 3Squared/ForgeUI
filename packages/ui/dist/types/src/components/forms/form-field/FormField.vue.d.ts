import Vue from 'vue';
import { getValidationState } from '../../../helpers';
/**
 * @displayName Form Field
 **/
export declare const ForgeFormField: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    currentValue: any;
}, {
    getValidationState: typeof getValidationState;
}, {
    fieldName: string;
}, {
    label: string;
    rules: string;
    value: any;
    type: string;
    disabled: boolean;
    vid: string | (() => null);
    placeholder: string;
    groupClass: string;
    labelCols: string | boolean;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeFormField;
