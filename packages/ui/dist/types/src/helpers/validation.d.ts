import Vue from 'vue';
import { ValidationObserver } from 'vee-validate';
export interface ValidationFlags {
    dirty: boolean;
    valid: boolean;
    validated: boolean;
}
export interface ValidationResult {
    valid: boolean;
    errors: string[];
}
interface InactiveRefCache {
    id: string;
    errors: string[];
    flags: ValidationFlags;
    failedRules: Record<string, string>;
}
export declare function getValidationState({ dirty, validated, valid }: ValidationFlags): false | null;
export declare const ValidateableComponent: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>> & {
    $refs: {
        observer: InactiveRefCache & InstanceType<typeof ValidationObserver>;
    };
}, unknown, {
    getValidationState: typeof getValidationState;
}, unknown, Record<never, any>, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export {};
