import { ForgeTableField, ForgeTableFieldArray } from '../../../helpers/types';
export declare function getColumnKey(field: string | ({
    key: string;
} & ForgeTableField)): string;
export declare function saveCustomisedColumns(id: string, columns: ForgeTableFieldArray): void;
export declare function loadCustomisedColumns(id: string): string[] | null;
//# sourceMappingURL=column-customiser-helper.d.ts.map