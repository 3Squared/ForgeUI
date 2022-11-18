import { nameof } from './index';
import { autoFilterType, ForgeTableFieldKeyed } from './types';

export class ForgeColumnBuilder<T> {
  private columns: ForgeColumnConfiguration<T>[] = [];

  addColumn(key: Extract<keyof T, string> | ((obj: T) => any), columnConfig?: (col: ForgeColumnConfiguration<T>) => void) {
    return this.addMiscColumn(nameof(key), columnConfig);
  }

  addMiscColumn(key: string, columnConfig?: (col: ForgeColumnConfiguration<T>) => void) {
    const column: ForgeTableFieldKeyed = { key, sortable: true };
    const columnBuilder = new ForgeColumnConfiguration<T>(column);
    if (columnConfig) {
      columnConfig(columnBuilder);
    }
    this.columns.push(columnBuilder);
    return this;
  }

  disableSorting() {
    this.columns.forEach(col => {
      col.disableSorting();
    });
    return this;
  }

  build(): ForgeTableFieldKeyed[] {
    return this.columns.map(c => c.build());
  }
}

class ForgeColumnConfiguration<T> {
  constructor(private column: ForgeTableFieldKeyed) {
  }


  addFormatter(formatter: (key: string, val: any, item: T) => any, sortByFormatter?: boolean) {
    this.column.formatter = formatter;
    if (sortByFormatter) {
      this.column.sortByFormatted = sortByFormatter;
    }
    return this;
  }

  enableAutoFilter(filterType: autoFilterType = 'string') {
    this.column.autoFilter = true;
    this.column.filterType = filterType;
    return this;
  }

  disableSorting() {
    this.column.sortable = false;
    return this;
  }

  setLabel(label: string) {
    this.column.label = label;
    return this;
  }

  setThStyle(style: any) {
    this.column.thStyle = style;
    return this;
  }

  setThClass(classes: string) {
    this.column.thClass = classes;
    return this;
  }

  setTdClass(classes: string) {
    this.column.tdClass = classes;
    return this;
  }

  setTdAttr(attr: any | ((value: any, key: string, item: T) => any)) {
    this.column.tdAttr = attr;
    return this;
  }

  setRequired() {
    this.column.required = true;
    return this;
  }

  build() {
    return this.column;
  }
}


