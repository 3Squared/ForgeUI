import { VueConstructor } from 'vue';
import { BvToastOptions } from 'bootstrap-vue';
import { ForgeToastType } from '../../../helpers/types';
declare const ForgeToasts: {
    install(Vue: VueConstructor): void;
};
export declare function useForgeToasts(): {
    forgeToast: (type: ForgeToastType, message: string, options?: BvToastOptions | undefined) => void;
};
export default ForgeToasts;
