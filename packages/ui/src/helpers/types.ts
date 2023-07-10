import { BvTableField, BvMsgBoxOptions, BvToastOptions } from "bootstrap-vue";
import { VNode } from "vue";
import { CreateElement } from "vue/types/umd";
export type autoFilterType = "string" | "number" | "date";
export type ForgeTableFieldKeyed = { key: string } & ForgeTableField;
export type ForgeTableField = BvTableField & { required?: boolean; autoFilter?: boolean; filterType?: autoFilterType };
export type ForgeTableFieldArray = Array<string | ({ key: string } & ForgeTableField)>;
export type ForgeStepperStep = { key: string; text: string; noBack?: boolean; isDisabled?: boolean };
export type ForgeTableColumnSelected = { key: string; selected: boolean };
export type ForgeTableColumnSelectedArray = Array<ForgeTableColumnSelected>;

export interface MultiSelectOption<T> {
  id: T;
  label: string;
  shortLabel?: string;
}

export interface SelectListOption<T> {
  value: T;
  text: string;
}

export type ForgeModalConfig = {
  body: Array<string | VNode | ((h: CreateElement) => VNode)>;
  options?: BvMsgBoxOptions;
  bAlertVariant?: string;
  modalId?: string;
  appendTo?: string;
};

export interface ForgeFileStatus {
  file: File;
  status: "NotUploaded" | "Uploaded" | "Failed";
  blobFileName: string | null;
  duplicateWarning: boolean;
  customFileName: string | null;
}

export interface ForgeIcon {
  component: string;
  isForge: boolean;
  isHovering: boolean;
  name: string;
}

export type ForgeToastType = "success" | "error";

/**
 * Flatpickr uses nulls to represent no date
 */
export type ForgeDatePickerNormalizer<TDate> = {
  fromNative: (d: Date | null) => TDate | null;
  toNative: (d: TDate | null) => Date | null;
};

declare module "vue/types/vue" {
  interface Vue {
    $forgeToast: (type: ForgeToastType, message: string, options?: BvToastOptions) => void;

    $forgeModal: {
      ok: (config: ForgeModalConfig) => Promise<true>;
      confirm: (config: ForgeModalConfig) => Promise<boolean | null>;
    };
  }
}
