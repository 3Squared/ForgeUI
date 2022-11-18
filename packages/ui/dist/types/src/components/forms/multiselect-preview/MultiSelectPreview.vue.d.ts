import Vue from 'vue';
import { MultiSelectOption } from '../../../helpers/types';
export declare type MultiSelectPreviewOrientationType = 'horizontal' | 'vertical' | 'horizontal-reversed';
/**
 * Multi Select with Preview component
 * This can be ordered horizontal(default), horizontal-reversed or vertical
 * @displayName MultiSelect Preview
 **/
export declare const ForgeMultiSelectPreview: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, unknown, {
    /**
     * Remove the selected MultiSelectOption from the list of selectedItems
     * Also fire the method that emits the change for the v-model linked list of items
     */
    removeSelectedItem(id: unknown): void;
    update(items: MultiSelectOption<unknown>[]): void;
}, {
    limitText: (count: number) => string;
}, {
    title: string;
    orientation: string;
    height: string;
    items: MultiSelectOption<unknown>[];
    selectedItems: MultiSelectOption<any>[];
    canRemoveItemFromPreview: boolean;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeMultiSelectPreview;
