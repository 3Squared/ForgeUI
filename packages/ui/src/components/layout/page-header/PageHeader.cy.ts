import ForgePageHeader from './PageHeader.vue';

describe('PageHeader.vue', () => {

  it('renders correctly', () => {
    
    cy.mount(ForgePageHeader, {
      propsData: {
        title: 'Hello world!',
        'data-cy': 'forge-page-header-1'
      }
    });

    cy.get('[data-cy=forge-page-header-1]').contains('Hello world!')
  });

  it('displays buttons correctly', () => {
    cy.mount(ForgePageHeader, {
      propsData: {
        title: 'Hello world!',
        'data-cy': 'forge-page-header-2'
      },
      slots: {
        default: '<button>Test Button</button>'
      }
    });

    cy.get('[data-cy=forge-page-header-2]').contains('Hello world!')
    cy.get('[data-cy=forge-page-header-2] button').contains('Test Button')
  });
});
