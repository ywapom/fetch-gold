// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clearScales', () => {
    // Loop through numbers 0 to 8
    for (let i = 0; i <= 8; i++) {
      // Clear non-empty left side fields
      cy.get(`#left_${i}`)
        .then(($input) => {
          if ($input.val()) {
            cy.wrap($input).clear();
          }
        });
  
      // Clear non-empty right side fields
      cy.get(`#right_${i}`)
        .then(($input) => {
          if ($input.val()) {
            cy.wrap($input).clear();
          }
        });
    }
  });  

Cypress.Commands.add('addBarToScale', (barNumber, scale) => {
    // Determine the prefix based on the scale ('left' or 'right')
    const scalePrefix = scale.toLowerCase();
    
    // Find the first available input in the specified scale
    cy.get(`input[data-side="${scalePrefix}"]`)
      .filter((index, input) => !input.value) // Filter to find empty inputs
      .first() // Select the first available input
      .type(barNumber.toString()); // Type the bar number into the input
  });

Cypress.Commands.add('clickWeighButton', () => {
    cy.get('#weigh').click();
});

Cypress.Commands.add('getResult', () => {
    // Select the button element within the result container and get its text
    return cy.get('.result button').invoke('text').then((text) => text.trim());
  });  

Cypress.Commands.add('waitForGameUpdate', () => {
    cy.get('.game-info ol').should('exist');
    cy.get('.game-info ol').should('have.length.greaterThan', 0); 
  });
  

  