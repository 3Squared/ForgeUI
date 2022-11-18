import { BvMsgBoxOptions } from 'bootstrap-vue';
export declare class ForgeModalBuilder {
    private options;
    constructor(id: string, title: string, onConfirm: () => any);
    setLegacyMode(): this;
    setOkOnly(okTitle?: string, okVariant?: string): this;
    setSize(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): this;
    setExtraProps(options: any): this;
    build(): BvMsgBoxOptions;
}
