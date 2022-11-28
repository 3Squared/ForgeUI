/**
 * @vitest-environment happy-dom
 */
import { expect, it, describe, vi, test } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import { positiveNumberDirective, wholeNumberDirective, alphanumericCharacterDirective, maxNumericCharactersDirective } from "@/directives";
import KeyPressEvent = JQuery.KeyPressEvent;

describe("positive number directive", () => {
  const comp = defineComponent({
    directives: {
      "positive-number": positiveNumberDirective
    },
    template: `<input type="text" value="1" v-positive-number />`
  });

  it("should prevent default event when - is pressed", async () => {
    const wrapper = shallowMount(comp);
    const event: Partial<KeyPressEvent> = { key: "-", preventDefault: vi.fn() };
    vi.spyOn(event, "preventDefault");
    wrapper.find("input").trigger("keypress", event);

    expect(event.preventDefault).toBeCalled();
  });

  it("should not prevent default event when numbers are pressed is pressed", async () => {
    const wrapper = shallowMount(comp);
    const event: Partial<KeyPressEvent> = { key: "1", preventDefault: vi.fn() };
    vi.spyOn(event, "preventDefault");
    wrapper.find("input").trigger("keypress", event);

    expect(event.preventDefault).not.toBeCalled();
  });
});

describe("whole number directive", () => {
  const comp = defineComponent({
    directives: {
      "whole-number": wholeNumberDirective
    },
    template: `<input type="text" value="1" v-whole-number />`
  });

  it("should prevent default event when . is pressed", async () => {
    const wrapper = shallowMount(comp);
    const event: Partial<KeyPressEvent> = { key: ".", preventDefault: vi.fn() };
    vi.spyOn(event, "preventDefault");
    wrapper.find("input").trigger("keypress", event);

    expect(event.preventDefault).toBeCalled();
  });

  it("should not prevent default event when numbers are pressed is pressed", async () => {
    const wrapper = shallowMount(comp);
    const event: Partial<KeyPressEvent> = { key: "2", preventDefault: vi.fn() };
    vi.spyOn(event, "preventDefault");
    wrapper.find("input").trigger("keypress", event);

    expect(event.preventDefault).not.toBeCalled();
  });
});

describe("alpha numeric directive", () => {
  const comp = defineComponent({
    directives: {
      "alphanumeric-character": alphanumericCharacterDirective
    },
    template: `<input type="text" value="1" v-alphanumeric-character />`
  });

  test.each([["."], ["/"], ["?"]])("should prevent default event when %s is pressed", (key) => {
    const wrapper = shallowMount(comp);
    const event: Partial<KeyPressEvent> = { key, preventDefault: vi.fn() };
    vi.spyOn(event, "preventDefault");
    wrapper.find("input").trigger("keypress", event);

    expect(event.preventDefault).toBeCalled();
  });

  test.each([["A"], ["a"], ["z"], ["B"]])("should not prevent default event when %s is pressed", (key) => {
    const wrapper = shallowMount(comp);
    const event: Partial<KeyPressEvent> = { key, preventDefault: vi.fn() };
    vi.spyOn(event, "preventDefault");
    wrapper.find("input").trigger("keypress", event);

    expect(event.preventDefault).not.toBeCalled();
  });
});

describe("max Numeric Directive", () => {
  const comp = defineComponent({
    directives: {
      "max-numeric-characters": maxNumericCharactersDirective
    },
    template: `<input type="text" value="" v-max-numeric-characters="2" />`
  });

  it("should allow input when number count less than max", async () => {
    const wrapper = shallowMount(comp);
    wrapper.find("input").setValue("1");
    const event: Partial<KeyPressEvent> = { key: "1", preventDefault: vi.fn() };
    vi.spyOn(event, "preventDefault");
    wrapper.find("input").trigger("keypress", event);

    expect(event.preventDefault).not.toBeCalled();
  });

  it("should prevent default event when number count greater than max", async () => {
    const wrapper = shallowMount(comp);
    wrapper.find("input").setValue("11");
    const event: Partial<KeyPressEvent> = { key: "1", preventDefault: vi.fn() };
    vi.spyOn(event, "preventDefault");
    wrapper.find("input").trigger("keypress", event);

    expect(event.preventDefault).toBeCalled();
  });

  it("should take account of negative numbers in max count", async () => {
    const wrapper = shallowMount(comp);
    wrapper.find("input").setValue("-1");
    const event: Partial<KeyPressEvent> = { key: "2", preventDefault: vi.fn() };
    vi.spyOn(event, "preventDefault");
    wrapper.find("input").trigger("keypress", event);

    expect(event.preventDefault).not.toBeCalled();
  });
});
