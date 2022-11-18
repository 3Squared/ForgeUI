import '@cypress/code-coverage/support';
import './commands';
import { mount } from 'cypress/vue';
declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}
