import Vue, { VueConstructor } from 'vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export interface ValidationFlags {
  dirty: boolean;
  valid: boolean;
  validated: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

interface InactiveRefCache {
  id: string;
  errors: string[];
  flags: ValidationFlags;
  failedRules: Record<string, string>;
}

export function getValidationState({ dirty, validated, valid }: ValidationFlags) {
  return dirty || validated ? (valid ? null : false) : null;
}

export const ValidateableComponent = /*#__PURE__*/ (Vue as VueConstructor<
  Vue & {
    $refs: {
      observer: InactiveRefCache & InstanceType<typeof ValidationObserver>;
    };
  }
>).extend({
  components: {
    ValidationObserver,
    ValidationProvider
  },
  methods: {
    getValidationState
  }
});
