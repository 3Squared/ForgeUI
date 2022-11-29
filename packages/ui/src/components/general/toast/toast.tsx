import { CreateElement, getCurrentInstance, VueConstructor } from "vue";
import { BIconCheck, BIconCircleFill, BIconstack, BIconXCircleFill, BvToastOptions, ToastPlugin } from "bootstrap-vue";
import { ForgeToastType } from "../../../helpers/types";


const ForgeToasts = {
  install(Vue: VueConstructor) {
    Vue.use(ToastPlugin);

    Vue.mixin({
      components: {BIconstack, BIconCheck, BIconXCircleFill, BIconCircleFill},
      methods: {
        $forgeToast(type: ForgeToastType, message: string, options?: BvToastOptions) {
          const toastContent = toast(this.$createElement, type, message);
 
          const defaultOptions = {
            title: [toastContent],
            solid: true,
            bodyClass: "d-none",
          } as BvToastOptions;

          this.$bvToast.toast([], {
            ...defaultOptions,
            ...options
          });
        }
      }
    });
  }
};


export function useForgeToasts() {
  const inst = getCurrentInstance()?.proxy;

  function forgeToast(type: ForgeToastType, message: string, options?: BvToastOptions) {
    if (inst) {
      inst.$forgeToast(type, message, options);
    }
    console.warn("method can only be used inside setup() or functional components");
    return;
  }

  return {forgeToast};
}

export default ForgeToasts;

function toast(h: CreateElement, type: ForgeToastType, message: string) {
  return h("div", {class: "d-flex flex-grow-1 align-items-center p-2"},
    [
      type == "success" ? successIcon(h) : errorIcon(h),
      h("span", message)
    ]);
}

function successIcon(h: CreateElement) {
  return h(BIconstack, {class: "mr-2", props: {fontScale: 2.5}},
    [
      h(BIconCircleFill, {props: {variant: "success", stacked: true}}),
      h(BIconCheck, {props: {variant: "white", stacked: true, scale: 0.75, shiftV: -0.25}})
    ]);
}

function errorIcon(h: CreateElement) {
  return h(BIconstack, {class: "mr-2", props: {fontScale: 2.5}},
    [
      h(BIconXCircleFill, {props: {variant: "danger", stacked: true}})
    ]);
}
