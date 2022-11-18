/*
import { mount } from 'cypress/vue2'
import { BButton, VBModal } from "bootstrap-vue";
import ForgeModal from "./Modal.vue";
import { defineComponent } from "vue";

const BaseModalWrapper = defineComponent({
  components: {ForgeModal},
  template: `
      <div>
        <forge-modal id="testModal" visible title="Test modal" class="bg-dark">
          <p>This is a test modal</p>
        </forge-modal>
      </div>`
});

const buttonTriggeredModal = defineComponent({
  components: { ForgeModal, BButton },
  directives:  { "b-modal": VBModal },
  template: `
    <div>
    <!-- Using modifiers -->
    <b-button v-b-modal.testModal variant="primary">
      Show Modal
    </b-button>

    <!-- The modal -->
    <forge-modal id="testModal" title="Delete Document?" :on-confirm="successForm">
      <b-alert variant="warning" show class="font-weight-bold border-warning">
        <p>
          Deleting a document will permanently remove it from the RailSamrt Docs system for all users.
        </p>

        This action cannot be undone
      </b-alert>
    </forge-modal>
    </div>`
});

it('mounts', () => {
  mount(BaseModalWrapper as any);
  cy.get('#testModal').should('be.visible');
});

it('renders the correct modal content', () => {
  const modalTitleText = "this is some title text";
  const modalBodyText = "this is some body text";
  
  mount(defineComponent({
    data() {
      return {
        titleText: modalTitleText,
        bodyText: modalBodyText
      }
    },
    
    components: {ForgeModal},
  
    template: `
      <div>
        <forge-modal id="testModal" visible :title="titleText" class="bg-dark">
          <p>{{bodyText}}</p>
        </forge-modal>
      </div>`
  }));
  
  cy.get('#testModal___BV_modal_title_').should('have.text', modalTitleText);
  cy.wait(500);
  cy.get('p').should('have.text', modalBodyText);
  cy.wait(500);
})

it('closes the modal on clicking cancel button', () => {
  mount(BaseModalWrapper as any);
  cy.wait(500);
  cy.get('.btn-outline-secondary').click();
  cy.wait(500);
  cy.get('#testModal').should('not.be.visible');
});

it('closes the modal on clicking ok button', () => {
  mount(BaseModalWrapper as any);
  cy.wait(500);
  cy.get('.btn-primary').click();
  cy.wait(500);
  cy.get('#testModal').should('not.be.visible');
});

it('triggers the modal via external button', () => {
  mount(buttonTriggeredModal as any);
  cy.wait(500);
  cy.get('#testModal').should('not.exist');
  cy.get('.btn-primary').click();
  cy.wait(500);
  cy.get('#testModal').should('exist');
  cy.get('#testModal').should('be.visible');
});*/
