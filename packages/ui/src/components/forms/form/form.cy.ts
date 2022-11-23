import { mount } from 'cypress/vue2';
import ForgeForm from './Form.vue';

describe('Form', () => {
  describe('Title',() => {
    it('should hide the title when the showTitle prop is false', () => {
      //Arrange
      mount(ForgeForm, {
        propsData: {
          showTitle: false
        }
      })
  
      //Act/Assert
      cy.get('[data-cy=form-title]').should('not.exist');
    })

    it('sets the title using the title prop', () => {
      //Arrange
      const title = 'This is a custom title for the form!';

      mount(ForgeForm, {
        propsData: {
          title
        }
      });

      //Act/Assert
      cy.get('[data-cy=form-title]').should('have.text', ' ' + title + ' ');
    })
  })
  
  describe('Buttons', () => {
    it('should call a function when the submit button is pressed', () => {
      //Arrange
      const stringToTestOnBtnClick = 'You just pressed the submit button';

      mount(ForgeForm, {
        propsData: {
          onSubmit: () => alert(stringToTestOnBtnClick)
        }
      });

      //Act
      cy.get('[data-cy=submit-btn]').click();

      //Assert
      cy.on('window:alert', (str) => {
        expect(str).to.equal(stringToTestOnBtnClick);
      })
    })

    it('should hide the cancel button when the hideCancel prop is true', () => {
      //Arrange
      mount(ForgeForm, {
        propsData: {
          hideCancel: true
        }
      })
      
      //Act/Assert
      cy.get('[data-cy=cancel-btn]').should('not.exist')
    })

    it('should have custom submit button text when the submitText prop is passed', () => {
      //Arrange
      mount(ForgeForm, {
        propsData: {
          submitText: 'meow'
        }
      })

      //Act/Assert
      cy.get('[data-cy=submit-btn]').should('contain.text', 'meow')
    })
  })
})








