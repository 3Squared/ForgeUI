import Vue, { defineComponent } from "vue";
import { BButton } from "bootstrap-vue";
import ForgeToasts from "./toast";

Vue.use(ForgeToasts);

const GoodToast = defineComponent({
  components: { BButton },
  methods: {
    showGoodToast() {
      this.$forgeToast("success", "Yay good things");
    }
  },
  template: `<b-button variant="success" id="GoodToastButton" @click="showGoodToast">Good Toast</b-button>`
});

const BadToast = defineComponent({
  components: { BButton },
  methods: {
    showBadToast() {
      this.$forgeToast("error", "Boo bad things");
    }
  },
  template: `<b-button variant="danger" id="BadToastButton" @click="showBadToast">Bad Toast</b-button>`
});

describe("Toasts", () => {
  it("Renders a successful toast", () => {
    cy.mount(GoodToast);
    cy.get("#GoodToastButton").click();
    cy.get("header.toast-header span").contains("Yay good things");
  });

  it("Renders an error toast", () => {
    cy.mount(BadToast);
    cy.get("#BadToastButton").click();
    cy.get("header.toast-header span").contains("Boo bad things");
  });
});
