import { mount } from 'cypress/vue2'
import ForgeFormField from "./FormField.vue";

it('shows a custom label based on passed through prop', () => {
  mount(ForgeFormField, {
    propsData : {
      label : 'Hi Test',
      "data-cy": "form-field-1"
    }
  });
  cy.get('[data-cy=form-field-1]').should('contain.text', 'Hi Test');
});

it('shows custom text-value based on passed through prop', () => {
  mount(ForgeFormField, {
    propsData : {
      label : 'Hi Test',
      value: 'meow'
    }
  });
  cy.get('#hi-test').should('contain.value', 'meow');
});
