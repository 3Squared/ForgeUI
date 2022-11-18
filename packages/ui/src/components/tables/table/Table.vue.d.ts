import Vue from 'vue';
import { ForgeTableFieldArray } from '../../../helpers/types';
import { getColumnKey } from '../table-column-customiser/column-customiser-helper';
import { BvTableCtxObject } from 'bootstrap-vue';
/**
 * @displayName Table
 **/
export declare const ForgeTable: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>> & {
    $refs: {
        table: {
            localItems: any[];
        };
    };
}, {
    pageSizes: number[];
    perPage: number;
    page: number;
    customisedFields: ForgeTableFieldArray;
    localFilters: any;
    localTableErrorMessage: string | null;
    localTableErrorDetails: string[] | null;
    errorDetailsOpen: boolean;
}, {
    updateFilters(): void;
    refreshTable(): void;
    clearFilters(): void;
    getHeadSlot(name: string): string;
    getColumnKey: typeof getColumnKey;
    itemsWrapper(ctx: BvTableCtxObject): Promise<any>;
    getItemsForExport(): any[];
}, {
    mergedAttrs: Object;
    filtersConfig: ({
        key: string;
    } & import("bootstrap-vue").BvTableField & {
        required?: boolean | undefined;
        autoFilter?: boolean | undefined;
        filterType?: import("../../../helpers/index").autoFilterType | undefined;
    })[];
}, {
    total: number;
    stickToPage: boolean;
    fields: ForgeTableFieldArray;
    showColumnCustomiser: boolean;
    showExporter: boolean;
    filters: any;
    tableError: any;
    clearColumn: string;
    exportItemsFunc: () => any[];
    legacyPaginationFooter: boolean;
    autoColumnWidth: boolean;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeTable;
//# sourceMappingURL=Table.vue.d.ts.map