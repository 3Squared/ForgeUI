import Vue from 'vue';
import { ForgeTableFieldArray } from '../../../../helpers';
export declare const ForgeTableExporter: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, unknown, {
    exportData(): Promise<void>;
}, unknown, {
    customisedFields: ForgeTableFieldArray;
    items: () => any[];
    name: string;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeTableExporter;
