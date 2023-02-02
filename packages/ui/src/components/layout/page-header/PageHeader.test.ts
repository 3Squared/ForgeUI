/**
 * @vitest-environment happy-dom
 */
import ForgePageHeader from "./PageHeader.vue";
import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";

describe("PageHeader.vue", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(ForgePageHeader, {
      propsData: {
        title: "Hello world!",
        "data-test": "forge-page-header-1"
      }
    });
    expect(wrapper.find("div").text()).toBe("Hello world!");
  });

  it("displays buttons correctly", () => {
    const wrapper = shallowMount(ForgePageHeader, {
      propsData: {
        title: "Hello world!",
        "data-test": "forge-page-header-2"
      },
      slots: {
        default: "<button>Test Button</button>"
      }
    });
    expect(wrapper.find("[data-test=forge-page-header-2] > h1").text()).toBe("Hello world!");
    expect(wrapper.find("[data-test=forge-page-header-2] button").text()).toBe("Test Button");
  });
});
