import { ForgeTableFieldKeyed, ForgeTableColumnSelected, ForgeTableColumnSelectedArray } from "../../../helpers/types";

export function getColumnKey(field: string | ForgeTableFieldKeyed): string {
  return typeof field == "string" ? field : field.key;
}

export function saveCustomisedColumns(id: string, columns: ForgeTableColumnSelectedArray) {
  window.localStorage.setItem(id, JSON.stringify(columns));
}

export function loadCustomisedColumns(id: string): ForgeTableColumnSelectedArray | null {
  const jsonCols = window.localStorage.getItem(id);
  if (jsonCols != null) {
    const cols = JSON.parse(jsonCols) as (ForgeTableColumnSelected | string)[];
    const colsObjects = cols.map((col) => {
      if (typeof col == "string") {
        return { key: col, selected: true } as ForgeTableColumnSelected;
      }
      return col as ForgeTableColumnSelected;
    });

    return colsObjects;
  } else {
    return null;
  }
}
