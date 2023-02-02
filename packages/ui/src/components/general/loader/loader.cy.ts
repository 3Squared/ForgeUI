import { mount } from "cypress/vue2";
import ForgeLoader from "./Loader.vue";
import { defineComponent } from "vue";
import "@/styles/loader.scss";
/***************************************************
 **************** WRAPPER SETUP ********************
 **************************************************/
/**
 * Wrapper for testing the default loader
 */
const BaseLoaderWrapper = defineComponent({
  components: { ForgeLoader },

  template: `
      <div>
        <forge-loader id="testLoader" />
      </div>`
});

/**
 * Wrapper for testing the loader with a custom loading message
 */
const CustomLoadingMessage = "WE LOADING BABY!";
const CustomLoaderWrapper = defineComponent({
  components: { ForgeLoader },
  data() {
    return {
      customLoadingMessage: CustomLoadingMessage
    };
  },

  template: `
      <div>
        <forge-loader id="testLoader" :label="customLoadingMessage" />
      </div>`
});

/***************************************************
 ************* END OF WRAPPER SETUP ****************
 **************************************************/

//------------------------------------------------------------------------------------------------------

/***************************************************
 ***************** START OF TESTS ******************
 **************************************************/
/**
 * Tests the default loader mounts correctly
 */
it("mounts default loader", () => {
  cy.wait(500);
  mount(BaseLoaderWrapper as any);
  cy.get("#testLoader").should("exist");
  cy.get("#testLoader").should("be.visible");
  cy.wait(1000);
});

/**
 * Tests the custom loader mounts correctly with valid custom text
 */
it("mounts custom loader", () => {
  cy.wait(500);
  mount(CustomLoaderWrapper as any);
  cy.get("#testLoader").should("exist");
  cy.get("#testLoader").should("be.visible");
  cy.get(".sr-only").should("have.text", CustomLoadingMessage);
});

/***************************************************
 ***************** END OF TESTS ********************
 **************************************************/
