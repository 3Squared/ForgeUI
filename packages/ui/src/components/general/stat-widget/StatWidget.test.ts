/**
 * @vitest-environment happy-dom
 */
import ForgeStatWidget from "./StatWidget.vue";
import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { ForgeGlobalConfigPlugin } from "../../../../index";
import Vue from "vue";

describe("StatWidget.vue", () => {

  it("should apply size classes correctly", () => {

    const wrapper = shallowMount(ForgeStatWidget, {
      propsData: {
        size: "sm",
      }
    });
    expect(wrapper.find("div").classes()).toContain("widget--sm");
  });

  it("should apply variant classes correctly", () => {

    const wrapper = shallowMount(ForgeStatWidget, {
      propsData: {
        size: "sm",
        variant: "danger"
      }
    });
    expect(wrapper.find("div").classes()).toContain("bg-danger");
  });

  it("should default to primary if no variant passed", () => {

    const wrapper = shallowMount(ForgeStatWidget, {
      propsData: {
        size: "sm",
      }
    });
    expect(wrapper.find("div").classes()).toContain("bg-primary");
  });

  it("should default to global setting if no variant passed", () => {
    Vue.use(ForgeGlobalConfigPlugin, {
      StatWidget: { variant: "success" }
    });
    const wrapper = shallowMount(ForgeStatWidget, {
      propsData: {
        size: "sm",
      }
    });
    expect(wrapper.find("div").classes()).toContain("bg-success");
  });
});
