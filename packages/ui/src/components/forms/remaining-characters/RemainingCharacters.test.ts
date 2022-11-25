/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ForgeRemainingCharacters from "./RemainingCharacters.vue";


describe("remaining characters tests", () => {
  it("display remaining count", () => {
    const wrapper = shallowMount(ForgeRemainingCharacters, {
      propsData: {
        maxCount: 100,
        currentCount: 90
      }
    });
    expect(wrapper.find("div").text()).toBe("Remaining characters: 10");

  }); 
  

  it("update remaining count", async () => {
    const wrapper = shallowMount(ForgeRemainingCharacters, {
      propsData: {
        maxCount: 100,
        currentCount: 10
      }
    });
    wrapper.setProps({
      currentCount: 50
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toBe("Remaining characters: 50");

  });
});

