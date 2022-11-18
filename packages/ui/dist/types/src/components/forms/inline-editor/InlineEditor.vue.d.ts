import { getValidationState } from '../../../helpers/validation';
import Vue from 'vue';
/**
 * @displayName Inline Editor
 **/
export declare const ForgeInlineEditor: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    localValue: null;
    editing: boolean;
    valid: Boolean | null;
    validationErrors: string[];
}, {
    validate(): Promise<boolean>;
    editFinished(): Promise<false | undefined>;
    beginEdit(): void;
    cancel(): void;
    reset(): void;
    update(v: any): Promise<void>;
    getValidationState: typeof getValidationState;
}, {
    validationState: Boolean | null;
}, {
    value: any;
    completeAction: void | Function;
    params: unknown[];
    readonly: boolean;
    isValid: void | Function;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeInlineEditor;
