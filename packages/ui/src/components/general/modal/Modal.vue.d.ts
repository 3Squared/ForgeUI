import { BvModalEvent } from 'bootstrap-vue';
interface ModalError {
    hasError: boolean;
    header: string;
    message: string[];
}
/**
 * @displayName Modal
 **/
export declare const ForgeModal: import("vue").DefineComponent<{
    onConfirm: {
        type: FunctionConstructor;
        default: null;
    };
    legacy: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, {
    loading: boolean;
    error: ModalError;
    emptyError: {
        hasError: boolean;
        header: string;
        message: never[];
    };
}, {
    mergedAttrs(): Object;
}, {
    success(event: BvModalEvent): Promise<void>;
    reset(event: Event): Promise<void>;
    preventBackgroundScroll(open: boolean): void;
}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    onConfirm: {
        type: FunctionConstructor;
        default: null;
    };
    legacy: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    onConfirm: Function;
    legacy: boolean;
}>;
export default ForgeModal;
//# sourceMappingURL=Modal.vue.d.ts.map