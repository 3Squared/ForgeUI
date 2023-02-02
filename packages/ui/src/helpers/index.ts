import { MultiSelectOption, SelectListOption } from "./types";

export * from "./validation";
export * from "./types";
export * from "./table-column-builder";
export * from "./modal-builder";
export * from "./date-picker-normalizers";
export * from "./navbar.builder";
import { nameof as tsNameOf } from "ts-simple-nameof";
import { capitalize, camelCase, startCase, isEqual } from "lodash";

export function stringFilterMatch(value: string | null, filter: string | null): boolean {
  if (filter == null) {
    return true;
  }

  if (value) {
    return value.toLowerCase().includes(filter.toLowerCase());
  }

  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function nameof<T extends Record<string, unknown>>(name: Extract<keyof T, string> | ((obj: T) => any)): string {
  if (typeof name == "string") {
    return name;
  } else {
    return tsNameOf<T>(name);
  }
}

export const arraysEqual = isEqual;

export function parseError(error: any) {
  const result = {
    errorMessage: "",
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
  if (result.errorMessage === "" && result.errorDetails.length === 0) {
    result.errorMessage = error;
  }
  return result;
}

export function enumToSelectList<T>(items: readonly T[], formatter?: (val: T) => string): SelectListOption<T>[] {
  return items.map((i) => ({ value: i, text: formatter ? formatter(i) : `${i}` }));
}

export function enumToMultiSelectList<T>(items: readonly T[], formatter?: (val: T) => string): MultiSelectOption<T>[] {
  return items.map((i) => ({ id: i, label: formatter ? formatter(i) : `${i}` }));
}

/**
 * `date-change` becomes `dateChange`
 */
export const kebabToCamel = camelCase;

type AppColours = "primary" | "success" | "warning" | "warning-dark" | "danger" | "light-grey" | "white" | "dark" | "info" | "secondary";

export function getColour(color: AppColours) {
  return getComputedStyle(document.body).getPropertyValue(`--${color}`).trim();
}

export { capitalize, startCase };
