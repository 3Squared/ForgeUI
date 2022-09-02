import { mount } from 'cypress/vue2'
import ActionButton from "./ActionButton.vue";
import { defineComponent } from "vue";


it('should become disabled while action is resolving', () => {
  mount(ActionButton, {
    slots: {
      default: 'Some Text',
    },
    propsData: {
      action: () => new Promise(resolve => setTimeout(resolve, 1000))
    },
    attrs: {
      disabled: false
    }
  });
  cy.get('button').should('not.have.attr', 'disabled')
  cy.get('button').click();
  cy.get('button').should('have.attr', 'disabled')
});

it('should reset to un disabled after an action', () => {
  mount(ActionButton, {
    slots: {
      default: 'Some Text',
    },
    propsData: {
      action: () => new Promise(resolve => setTimeout(resolve, 1000))
    },
    attrs: {
      disabled: false
    }
  });
  cy.get('button').should('not.have.attr', 'disabled')
  cy.get('button').click();
  cy.get('button').should('have.attr', 'disabled')
  cy.wait(1000)
  cy.get('button').should('not.have.attr', 'disabled')
});

it('should reset to un disabled after an action', () => {
  const wrapper = defineComponent({
    components: { ActionButton },
    data() {
      return {
        isButtonDisabled: false
      }
    },
    methods: {
      exampleSave() {
        this.isButtonDisabled = true;
        return new Promise(resolve => setTimeout(resolve, 1000))
      }
    },
    template: `
      <div>
      <ActionButton :disabled="isButtonDisabled" :action="exampleSave">Test button</ActionButton>
      </div>`
  });
  mount(wrapper)
  cy.get('button').should('not.have.attr', 'disabled')
  cy.get('button').click();
  cy.get('button').should('have.attr', 'disabled')
  cy.wait(1000)
  cy.get('button').should('have.attr', 'disabled')
});