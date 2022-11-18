import { ForgeStepperStep } from '../../../helpers';
import Vue from 'vue';
/**
 * @displayName Stepper
 **/
export declare const ForgeStepper: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    currentStepLocal: number;
}, {
    changeStep(newStep: number): void;
    nextStep(): void;
    previousStep(): void;
}, {
    computedSteps: ForgeStepperStep[];
    isBackButtonDisabled: boolean;
}, {
    variant: any;
    steps: ForgeStepperStep[];
    currentStep: number;
    showSteps: boolean;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default ForgeStepper;
