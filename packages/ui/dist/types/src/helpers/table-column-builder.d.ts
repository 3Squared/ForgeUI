import { autoFilterType, ForgeTableFieldKeyed } from './types';
export declare class ForgeColumnBuilder<T> {
    private columns;
    addColumn(key: Extract<keyof T, string> | ((obj: T) => any), columnConfig?: (col: ForgeColumnConfiguration<T>) => void): this;
    addMiscColumn(key: string, columnConfig?: (col: ForgeColumnConfiguration<T>) => void): this;
    disableSorting(): this;
    build(): ForgeTableFieldKeyed[];
}
declare class ForgeColumnConfiguration<T> {
    private column;
    constructor(column: ForgeTableFieldKeyed);
    addFormatter(formatter: (key: string, val: any, item: T) => any, sortByFormatter?: boolean): this;
    enableAutoFilter(filterType?: autoFilterType): this;
    disableSorting(): this;
    setLabel(label: string): this;
    setThStyle(style: any): this;
    setThClass(classes: string): this;
    setTdClass(classes: string): this;
    setTdAttr(attr: any | ((value: any, key: string, item: T) => any)): this;
    setRequired(): this;
    build(): ForgeTableFieldKeyed;
}
export {};
