/**
 * @vitest-environment happy-dom
 */
import ForgeForm from "./Form.vue";
import { describe, expect, it, vi } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";

const mockSubmit = { onSubmit: vi.fn() };
describe("Form", () => {
  describe("Title", () => {
    it("should hide the title when the showTitle prop is false", () => {
      //Arrange
      const wrapper = shallowMount(ForgeForm, {
        propsData: {
          ...mockSubmit,
          showTitle: false
        }
      });

      expect(wrapper.find("[data-cy=form-title]").exists()).toBeFalsy();
    });

    it("sets the title using the title prop", () => {
      //Arrange
      const title = "This is a custom title for the form!";

      const wrapper = shallowMount(ForgeForm, {
        propsData: {
          ...mockSubmit,
          title
        }
      });

      expect(wrapper.find("[data-cy=form-title]").text()).toBe(title);
    });

    it("should show the loading spinner whilst the form is submitting", async () => {
      //Arrange
      const wrapper = mount(ForgeForm, {
        propsData: {
          ...mockSubmit
        }
      });

      //Act
      await wrapper.find("form").trigger("submit.prevent");
      expect(wrapper.find(".forge-loader").exists());
      await wrapper.vm.$nextTick();
      expect(wrapper.find(".forge-loader").exists()).toBeFalsy();
    });

    it("should display an error if the submit function fails", async () => {
      //Arrange
      const wrapper = mount(ForgeForm, {
        propsData: {
          onSubmit: async () => {
            await new Promise((r) => setTimeout(r, 1));
            throw { message: "Bad stuff happened" };
          }
        }
      });

      //Act
      expect(wrapper.find("[role=alert]").exists()).toBeFalsy();

      await wrapper.find("form").trigger("submit.prevent");
      await new Promise((r) => setTimeout(r, 1));
      expect(wrapper.find("[role=alert]").text()).toBe("Bad stuff happened");

      //Submitting form again should clear error
      await wrapper.find("form").trigger("submit.prevent");
      await wrapper.vm.$nextTick();
      expect(wrapper.find("[role=alert]").exists()).toBeFalsy();
    });
  });

  describe("Buttons", () => {
    it("should call a function when the submit button is pressed", async () => {
      //Arrange
      const onClick = vi.fn();
      const wrapper = mount(ForgeForm, {
        propsData: {
          onSubmit: onClick
        }
      });

      //Act
      await wrapper.find("form").trigger("submit.prevent");

      //Assert
      expect(onClick).toBeCalled();
    });

    it("should hide the cancel button when the hideCancel prop is true", () => {
      //Arrange
      const wrapper = shallowMount(ForgeForm, {
        propsData: {
          ...mockSubmit,
          hideCancel: true
        }
      });

      //Act/Assert
      expect(wrapper.find("[data-cy=cancel-btn]").exists()).toBeFalsy();
    });

    it("should have custom submit button text when the submitText prop is passed", () => {
      //Arrange
      const wrapper = shallowMount(ForgeForm, {
        propsData: {
          ...mockSubmit,
          submitText: "meow"
        }
      });

      //Act/Assert
      expect(wrapper.find("[data-cy=submit-btn]").text()).toBe("meow");
    });
  });
});
