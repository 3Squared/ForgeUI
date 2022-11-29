export interface ValidationFlags {
  dirty: boolean;
  valid: boolean;
  validated: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/*interface InactiveRefCache {
  id: string;
  errors: string[];
  flags: ValidationFlags;
  failedRules: Record<string, string>;
}*/

export function getValidationState({ dirty, validated, valid }: ValidationFlags) {
  return dirty || validated ? (valid ? null : false) : null;
}
