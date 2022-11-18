import Vue from 'vue';
import { ForgeTableFieldArray, ForgeTableField } from '../../../helpers/types';
import { getColumnKey } from './column-customiser-helper';
/**
 * @displayName Column Customiser
 **/
export declare const ForgeTableColumnCustomiser: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>> & {
    $refs: {
        dropdown: {
            hide(returnFocus: boolean): void;
        };
    };
}, {
    lastSelectedFields: string[];
    selectedFields: string[];
    orignalFields: ForgeTableFieldArray;
    availableFields: ForgeTableFieldArray;
}, {
    getColumnKey: typeof getColumnKey;
    getLabel(field: string | ({
        key: string;
    } & ForgeTableField)): string;
    revert(): void;
    reset(): void;
    confirm(): void;
    saveAndClose(newColumns: ForgeTableFieldArray): void;
    canFieldBeHidden(field: string | ({
        key: string;
    } & ForgeTableField)): boolean;
}, {
    hasChanges: boolean;
    changesCount: {
        selectedCount: number;
        availableCount: number;
    };
    newColumns: ForgeTableFieldArray;
}, {
    id: string;
    fields: ForgeTableFieldArray;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeTableColumnCustomiser;
