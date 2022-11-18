import { mount } from 'cypress/vue2';
import ForgeMultiselectPreview from './MultiSelectPreview.vue';

import { items, selectedItems } from 'apps/docs/src/pages/forms/multiselect-preview/examples/example-data'

describe('MultiSelectPreview.vue', () => {
  it('renders correctly', () => {
    mount(ForgeMultiselectPreview, {
      propsData: {
        items: items,
        selectedItems: selectedItems,
        "data-cy": "forge-multiselect-preview-1"
      }
    });
    
    cy.get('[data-cy=forge-multiselect-preview-1]').contains('Andrew Powell (Senior)')
    cy.get('[data-cy=forge-multiselect-preview-1]').contains('Tom Smith (Senior)')
    cy.get('[data-cy=forge-multiselect-preview-1]').contains('Hamza Mahmood (Dev)')
    cy.get('[data-cy=forge-multiselect-preview-1]').contains('Isabel Mallon (Junior Dev)')
  });
});
