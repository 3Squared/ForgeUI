import { VueConstructor } from 'vue';
import { ForgeModalConfig } from '../../../helpers/types';
declare const _default: {
    install(Vue: VueConstructor): void;
};
export default _default;
export declare function useForgeModal(): {
    forgeOkModal: (config: ForgeModalConfig) => Promise<true> | undefined;
    forgeConfirmModal: (config: ForgeModalConfig) => Promise<boolean | null> | undefined;
};
