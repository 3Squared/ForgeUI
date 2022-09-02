import { ForgeTableField, ForgeTableFieldArray } from '../../../helpers/types';

export function getColumnKey(field: string | ({ key: string } & ForgeTableField)): string {
  return typeof field == 'string' ? field : field.key;
}

export function saveCustomisedColumns(id: string, columns: ForgeTableFieldArray) {
  window.localStorage.setItem(id, JSON.stringify(columns.map(c => getColumnKey(c))));
}

export function loadCustomisedColumns(id: string): string[] | null {
  const jsonCols = window.localStorage.getItem(id);

  return jsonCols == null ? null : (JSON.parse(jsonCols) as string[]);
}
