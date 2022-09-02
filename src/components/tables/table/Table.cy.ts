import { mount } from 'cypress/vue2'
import ForgeTable from './Table.vue'

const mountTable = (items : object[]) => {
  mount(ForgeTable, {
    propsData: {
      fields: [
        { key: 'id', autoFilter: true, sortable: true, filterType: 'number' },
        { key: 'firstName', autoFilter: true, sortable: true },
        { key: 'lastName', autoFilter: true, sortable: true },
        { key: 'employmentDate', autoFilter: true, filterType: 'date', sortable: true },
        { key: 'actions', autoFilter: false, sortable: false }
      ],
      total: items.length,
      items: items,
      filters: {
        id: null as number | null,
        name: null as null | string,
        lastName: null as null | string
      }
    },
  })
}

describe('Forge Table', () => {
  describe('Sorting', () => {
    beforeEach(() => {
      const items = [
        { id: 1, firstName: 'Jake', lastName: 'Minor', employmentDate: new Date('8/8/2022').toLocaleDateString('en-GB') },
        { id: 2, firstName: 'Tom', lastName: 'Smith', employmentDate: new Date('7/8/2022').toLocaleDateString('en-GB') }
      ]
      mountTable(items)
    })
    
    it('should be possible to sort columns in descending order', () => {
      //Act
      cy.get('.forge-filter-header').contains('Id').dblclick()
      
      //Assert
      cy.get('tbody tr').first().children('td').first().should('contain.text','2')
    })
    
    it('should be possible to sort columns in ascending order', () => {
      //Arrange
      cy.get('.forge-filter-header').contains('Id').dblclick()
      cy.get('tbody tr').first().children('td').first().should('contain.text', '2')

      //Act
      cy.get('.forge-filter-header').contains('Id').click()
      
      //Assert
      cy.get('tbody tr').first().children('td').first().should('contain.text', '1')
    })
  })
  
  describe('Filters', () => {
    beforeEach(() => {
      const items = [
        { id: 1, firstName: 'Jake', lastName: 'Minor', employmentDate: new Date('8/8/2022').toLocaleDateString('en-GB') },
        { id: 2, firstName: 'Tom', lastName: 'Smith', employmentDate: new Date('7/8/2022').toLocaleDateString('en-GB') }
      ]
      mountTable(items)
    })
    
    it('should be possible to input and clear filter for a number input', () => {
      //Act
      cy.get('input[placeholder=Id]').type('2').should('have.value', '2')
      cy.get('svg[aria-label="x circle"]').click()
      
      //Assert
      cy.get('input[placeholder=Id]').should('have.value', '')
    })

    it('should be possible to input and clear filter for a string input', () => {
      //Act
      cy.get('input[placeholder="First Name"]').type('2').should('have.value', '2')
      
      //Assert
      cy.get('svg[aria-label="x circle"]').click()
      cy.get('input[placeholder="First Name"]').should('have.value', '')
    })
    
    it('should be possible to input and clear filter for a date input', () => {
      //Act
      cy.get('input[placeholder="Employment Date"]').last().click()
      cy.get('span[class="flatpickr-day today"]').last().click({force: true})
      cy.get('input[placeholder="Employment Date"]').should('have.value', new Date().toLocaleDateString('en-CA'))

      //Assert
      cy.get('svg[aria-label="x circle"]').click()
      cy.get('input[placeholder="Employment Date"]').should('have.value', '')
    })
    
    it('should be possible to input into more than one filter', () => {
      //Act
      cy.get('input[placeholder="First Name"]').type('2')
      cy.get('input[placeholder=Id]').type('2')
      
      //Assert
      cy.get('input[placeholder=Id]').should('have.value', '2')
      cy.get('input[placeholder="First Name"]').should('have.value', '2')
    })
    
    it('should have a clear button in the action column header', () => {
      //Assert
      cy.get('#clear-filters button u').should('have.text', 'Clear')
    })
  })
  
  describe('Grid', () => {
    it('should return a friendly message if the search yields no results', () => {
      //Arrange
      const items = [] as object[]
      mountTable(items)
      
      //Act/Assert
      cy.get('td div h5').should('contain.text', 'No records to display')
    })
    
    it('should render data under the correct headings', () => {
      //Arrange
      const items = [
        { id: 1, firstName: 'Jake', lastName: 'Minor', employmentDate: new Date('8/8/2022').toLocaleDateString('en-GB') }
      ]
      mountTable(items)
      
      //Act/Assert
      cy.get('thead tr').first().children('th').first().should('contain.text', 'Id')
      cy.get('tbody tr').first().children('td').first().should('contain.text', '1')

      cy.get('thead tr').first().children('th').eq(1).should('contain.text', 'First Name')
      cy.get('tbody tr').first().children('td').eq(1).should('contain.text', 'Jake')

      cy.get('thead tr').first().children('th').eq(2).should('contain.text', 'Last Name')
      cy.get('tbody tr').first().children('td').eq(2).should('contain.text', 'Minor')

      cy.get('thead tr').first().children('th').eq(3).should('contain.text', 'Employment Date')
      cy.get('tbody tr').first().children('td').eq(3).should('contain.text', '08/08/2022')
    })
    
    it('should be possible to render multiple rows', () => {
      //Arrange
      const items = [
        { id: 1, firstName: 'Jake', lastName: 'Minor', employmentDate: new Date('8/8/2022').toLocaleDateString('en-GB') },
        { id: 2, firstName: 'Tom', lastName: 'Smith', employmentDate: new Date('7/8/2022').toLocaleDateString('en-GB') }
      ]
      mountTable(items)
      
      //Act/Assert
      cy.get('tbody tr').first().children('td').first().should('have.text', '1')
      cy.get('tbody tr').first().children('td').eq(1).should('have.text', 'Jake')
      cy.get('tbody tr').first().children('td').eq(2).should('have.text', 'Minor')
      cy.get('tbody tr').first().children('td').eq(3).should('have.text', '08/08/2022')

      cy.get('tbody tr').last().children('td').first().should('have.text', '2')
      cy.get('tbody tr').last().children('td').eq(1).should('have.text', 'Tom')
      cy.get('tbody tr').last().children('td').eq(2).should('have.text', 'Smith')
      cy.get('tbody tr').last().children('td').eq(3).should('have.text', '08/07/2022')
    })
  })

  describe('Filtering Results Displayed', () => {
    it("shouldn't pluralise the item text in the table footer if the search only returns a singular result", () => {
      //Arrange
      const items = [{ id: 1, firstName: 'Jake', lastName: 'Minor', employmentDate: new Date('8/8/2022').toLocaleDateString('en-GB') }]
      mountTable(items)

      //Act/Assert
      cy.get('span[data-cy="table-page-count"]').should('have.text', '1 result across 1 page')
    })
    
    it("shouldn't pluralise the page text in the table footer if the search only returns a single page of results", () => {
      //Arrange
      const items = [
        { id: 1, firstName: 'Jake', lastName: 'Minor', employmentDate: new Date('8/8/2022').toLocaleDateString('en-GB') },
        { id: 2, firstName: 'Tom', lastName: 'Smith', employmentDate: new Date('7/8/2022').toLocaleDateString('en-GB') }
      ]
      mountTable(items)
      
      //Act/Assert
      cy.get('span[data-cy="table-page-count"]').should('have.text', '2 results across 1 page')
    })
    
    it("should be possible to set the table to display 10 items per page", () => {
      //Arrange
      const items = []
      for (let i = 1; i <= 50; i++) {
        items.push({ id: i, firstName: i, lastName: i, employmentDate: new Date(Date.now()).toLocaleString('en-GB')})
      }
      mountTable(items)
      
      //Act/Assert
      cy.get('select[data-cy="table-count-selector"]').select('10')
      cy.get('span[data-cy="table-page-count"]').should('have.text', '50 results across 5 pages')
    })

    it("should be possible to set the table to display 50 items per page", () => {
      //Arrange
      const items = []
      for (let i = 1; i <= 50; i++) {
        items.push({ id: i, firstName: i, lastName: i, employmentDate: new Date(Date.now()).toLocaleString('en-GB') })
      }
      mountTable(items)

      //Act/Assert
      cy.get('select[data-cy="table-count-selector"]').select('50')
      cy.get('span[data-cy="table-page-count"]').should('have.text', '50 results across 1 page')
    })

    it("should be possible to set the table to display 50 items per page", () => {
      //Arrange
      const items = []
      for (let i = 1; i <= 101; i++) {
        items.push({ id: i, firstName: i, lastName: i, employmentDate: new Date(Date.now()).toLocaleString('en-GB') })
      }
      mountTable(items)

      //Act/Assert
      cy.get('select[data-cy="table-count-selector"]').select('100')
      cy.get('span[data-cy="table-page-count"]').should('have.text', '101 results across 2 pages')
    })
  })
  
  describe('Pagination', () => {
    //Arrange
    beforeEach(() => {
      const items = []
      for (let i = 1; i <= 101; i++) {
        items.push({ id: i, firstName: i, lastName: i, employmentDate: new Date(Date.now()).toLocaleString('en-GB') })
      }
      mountTable(items)
    })
    
    it('should be possible to navigate to the next page', () => {
      //Act
      cy.get('button').contains('2').click()
    
      //Assert
      cy.get('button').contains('2').parent().should('have.class', 'page-item active')
      cy.get('tbody tr').first().children('td').first().should('have.text','21')
    })

    it('should be possible to navigate to the previous page', () => {
      //Arrange
      cy.get('button').contains('2').click()
      cy.get('button').contains('2').parent().should('have.class', 'page-item active')

      //Act
      cy.get('button').contains('1').click()

      //Assert
      cy.get('button').contains('2').parent().should('not.have.class', 'page-item active')
      cy.get('button').contains('1').parent().should('have.class', 'page-item active')
      cy.get('tbody tr').children('td').first().should('have.text','1')
    })
    
    it('should be possible to navigate to the first page using the first page button', () => {
      //Arrange
      cy.get('button').contains('3').click()
      cy.get('button').contains('3').parent().should('have.class', 'page-item active')
      
      //Act
      cy.get('button').contains('1').click()

      //Assert
      cy.get('button').contains('3').parent().should('not.have.class', 'page-item active')
      cy.get('button').contains('1').parent().should('have.class', 'page-item active')
      cy.get('tbody tr').children('td').first().should('have.text','1')
    })

    it('should be possible to navigate to the last page using the last page button', () => {
      //Act
      cy.get('button').contains('»').click()

      //Assert
      cy.get('button').contains('1').should('not.exist')
      cy.get('button').contains('6').parent().should('have.class', 'page-item active')
      cy.get('tbody tr').children().first().should('have.text','101')
    })
  })
})