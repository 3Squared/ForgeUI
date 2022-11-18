import Vue from 'vue';
/**
 * The Forge Action button is design to provide an easy way to perform async actions that do not require much UI,
 * when the button is clicked the action button will display a spinner and then remove if the operation is successful otherwise it will display a forge toast error
 * It is for perfoming some kind of event to the server that doesnt require a form or modal, so for normal buttons use a b-button.
 *
 - Automatic loading and disabled state for button
 - Automatic error handling
 - Customisable content
 * @displayName Action Button
 **/
export declare const ForgeActionButton: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>> & {
    $refs: {
        button: HTMLButtonElement;
    };
}, {
    loading: boolean;
    buttonWidth: number | null;
}, {
    performAction(): Promise<void>;
}, {
    width: string;
}, {
    action: Function;
    params: unknown[];
    variant: string;
    errorMessage: string;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeActionButton;
//# sourceMappingURL=ActionButton.vue.d.ts.map