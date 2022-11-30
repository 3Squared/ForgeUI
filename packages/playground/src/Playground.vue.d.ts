import { PropDefs } from './composables/useMapProp';
declare const _default: import("vue/types/v3-component-public-instance").ComponentPublicInstanceConstructor<import("vue/types/v3-component-public-instance").Vue3Instance<{}, Readonly<import("vue").ExtractPropTypes<{
    code: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    options: {
        type: ObjectConstructor;
        required: true;
    };
    rerender: {
        type: BooleanConstructor;
        default: boolean;
    };
    config: {
        type: () => Partial<Record<string, PropDefs>>;
        required: true;
    };
}>>, Readonly<import("vue").ExtractPropTypes<{
    code: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    options: {
        type: ObjectConstructor;
        required: true;
    };
    rerender: {
        type: BooleanConstructor;
        default: boolean;
    };
    config: {
        type: () => Partial<Record<string, PropDefs>>;
        required: true;
    };
}>>, {}, {
    code: string;
    rerender: boolean;
}, true, import("vue/types/v3-component-options").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, any>> & Readonly<Readonly<import("vue").ExtractPropTypes<{
    code: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    options: {
        type: ObjectConstructor;
        required: true;
    };
    rerender: {
        type: BooleanConstructor;
        default: boolean;
    };
    config: {
        type: () => Partial<Record<string, PropDefs>>;
        required: true;
    };
}>>> & import("vue").ShallowUnwrapRef<{}> & import("vue/types/v3-component-options").ExtractComputedReturns<{}> & import("vue").ComponentCustomProperties & Readonly<import("vue").ExtractPropTypes<{
    code: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    options: {
        type: ObjectConstructor;
        required: true;
    };
    rerender: {
        type: BooleanConstructor;
        default: boolean;
    };
    config: {
        type: () => Partial<Record<string, PropDefs>>;
        required: true;
    };
}>>, any, any, any, import("vue").ComponentComputedOptions, import("vue").ComponentMethodOptions> & import("vue/types/v3-component-options").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    code: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    options: {
        type: ObjectConstructor;
        required: true;
    };
    rerender: {
        type: BooleanConstructor;
        default: boolean;
    };
    config: {
        type: () => Partial<Record<string, PropDefs>>;
        required: true;
    };
}>>, {}, {}, {}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, {
    code: string;
    rerender: boolean;
}> & {
    props: {
        code: {
            type: StringConstructor;
            default: string;
            required: true;
        };
        options: {
            type: ObjectConstructor;
            required: true;
        };
        rerender: {
            type: BooleanConstructor;
            default: boolean;
        };
        config: {
            type: () => Partial<Record<string, PropDefs>>;
            required: true;
        };
    };
} & (new () => {
    $slots: Record<string, Record<string, any>> & {
        component: (_: {
            ref: string;
        }) => any;
        're-render': (_: {}) => any;
        header: (_: {}) => any;
        additionalOptions: (_: {}) => any;
    };
});
export default _default;
