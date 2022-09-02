import { BvToastOptions } from 'bootstrap-vue';
import { ForgeToastType, ForgeModalConfig } from './helpers/types';

declare module 'vue/types/vue' {
  interface Vue {
    $forgeToast: (type: ForgeToastType, message: string, options?: BvToastOptions) => void;

    $forgeModal: {
      ok: (config: ForgeModalConfig) => Promise<true>;
      confirm: (config: ForgeModalConfig) => Promise<boolean | null>;
    };
  }
}
