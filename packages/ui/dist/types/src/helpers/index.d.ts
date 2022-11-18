import { MultiSelectOption, SelectListOption } from './types';
export * from './validation';
export * from './types';
export * from './table-column-builder';
export * from './modal-builder';
export * from './date-picker-normalizers';
export * from './navbar.builder';
export declare function stringFilterMatch(value: string | null, filter: string | null): boolean;
export declare function nameof<T>(name: Extract<keyof T, string> | ((obj: T) => any)): string;
export declare const startCase: (str: string) => string;
export declare function arraysEqual(a: any[], b: any[]): boolean;
export declare function parseError(error: any): {
    errorMessage: string;
    errorDetails: string[];
};
export declare function enumToSelectList<T>(items: readonly T[], formatter?: (val: T) => string): SelectListOption<T>[];
export declare function enumToMultiSelectList<T>(items: readonly T[], formatter?: (val: T) => string): MultiSelectOption<T>[];
export declare const capitalize: (s: string) => string;
/**
 * `date-change` becomes `dateChange`
 */
export declare const kebabToCamel: (s: string) => string;
declare type AppColours = 'primary' | 'success' | 'warning' | 'warning-dark' | 'danger' | 'light-grey' | 'white' | 'dark' | 'info' | 'secondary';
export declare function getColour(color: AppColours): string;
