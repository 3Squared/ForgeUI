// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import "@cypress/code-coverage/support";

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount as mount2 } from "cypress/vue2";

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

// @ts-ignore
Cypress.Commands.add("mount", (...args) => {
  // @ts-ignore
  return mount2(...args).then(({ wrapper }) => {
    return cy.wrap(wrapper).as("vue");
  });
});
// Example use:
// cy.mount(MyComponent)
