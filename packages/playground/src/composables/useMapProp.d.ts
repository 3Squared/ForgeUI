interface PropDef {
    required?: boolean;
    disabled?: () => boolean;
}
interface SelectPropDef extends PropDef {
    type: 'select';
    options: any[];
}
export declare type PropDefs = SelectPropDef | PropDef;
export declare function usePlayground<T extends Record<string, any>>(defaultProps: T, inConfig?: Partial<Record<keyof T, PropDefs>>, additionalReset?: () => void): {
    options: [T] extends [import("vue").Ref<any>] ? T : import("vue").Ref<import("vue").UnwrapRef<T>>;
    config: [Partial<Record<keyof T, PropDefs>>] extends [import("vue").Ref<any>] ? import("vue").Ref<any> & Partial<Record<keyof T, PropDefs>> : import("vue").Ref<import("vue").UnwrapRef<Partial<Record<keyof T, PropDefs>>>>;
    propVals: import("vue").ComputedRef<(string | undefined)[]>;
    reset: () => void;
};
export {};
