import { MultiSelectOption, SelectListOption } from './types';

export * from './validation';
export * from './types';
export * from './table-column-builder';
export * from './modal-builder';
export * from './date-picker-normalizers';
export * from './navbar.builder';
import { nameof as tsNameOf } from 'ts-simple-nameof';

export function stringFilterMatch(value: string | null, filter: string | null): boolean {
  if (filter == null) {
    return true;
  }

  if (value) {
    return value.toLowerCase().includes(filter.toLowerCase());
  }

  return false;
}

export function nameof<T>(name: Extract<keyof T, string> | ((obj: T) => any)): string {
  if (typeof name == 'string') {
    return name;
  } else {
    return tsNameOf(name);
  }
}

const RX_UNDERSCORE = /_/g;
const RX_LOWER_UPPER = /([a-z])([A-Z])/g;
const RX_START_SPACE_WORD = /(\s|^)(\w)/g;

export const startCase = (str: string) =>
  str
    .replace(RX_UNDERSCORE, ' ')
    .replace(RX_LOWER_UPPER, (_, $1, $2) => $1 + ' ' + $2)
    .replace(RX_START_SPACE_WORD, (_, $1, $2) => $1 + $2.toUpperCase());

export function arraysEqual(a: any[], b: any[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function parseError(error: any) {
  const result = {
    errorMessage: '',
    errorDetails: [] as string[]
  };
  if (error.exception) {
    result.errorMessage = error.exception;
  }
  if (error.message) {
    if (Array.isArray(error.message)) {
      result.errorDetails = error.message;
    } else {
      result.errorMessage = error.message;
    }
  }
  if (error.response) {
    const parsedResponse = JSON.parse(error.response);
    if (parsedResponse.errors) {
      result.errorDetails = Object.values<string[]>(parsedResponse.errors).flat();
    }
    if (parsedResponse.message) {
      result.errorDetails = parsedResponse.message;
    }
  }
  if (result.errorMessage === '' && result.errorDetails.length === 0) {
    result.errorMessage = error;
  }
  return result;
}

export function enumToSelectList<T>(items: readonly T[], formatter?: (val: T) => string): SelectListOption<T>[] {
  return items.map(i => ({ value: i, text: formatter ? formatter(i) : `${i}` }));
}

export function enumToMultiSelectList<T>(items: readonly T[], formatter?: (val: T) => string): MultiSelectOption<T>[] {
  return items.map(i => ({ id: i, label: formatter ? formatter(i) : `${i}` }));
}

export const capitalize = (s: string): string => (s[0]?.toUpperCase() ?? '') + s.substring(1);

/**
 * `date-change` becomes `dateChange`
 */
export const kebabToCamel = (s: string): string => {
  const segments = s.split('-');

  return segments.length > 1
    ? segments[0] +
        segments
          .splice(1)
          .map(capitalize)
          .join('')
    : s;
};

type AppColours =
  | 'primary'
  | 'success'
  | 'warning'
  | 'warning-dark'
  | 'danger'
  | 'light-grey'
  | 'white'
  | 'dark'
  | 'info'
  | 'secondary'

export function getColour(color: AppColours) {
  return getComputedStyle(document.body)
    .getPropertyValue(`--${color}`)
    .trim();
}
