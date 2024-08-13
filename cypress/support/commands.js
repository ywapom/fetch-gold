// cpress/support/commands.js

Cypress.Commands.add('clearScales', () => {
  for (let i = 0; i <= 8; i++) {
    cy.get(`#left_${i}`).clear();
    cy.get(`#right_${i}`).clear();
  }
});

Cypress.Commands.add('addBarToScale', (barNumber, scale) => {
    // Determine the prefix based on the scale ('left' or 'right')
    const scalePrefix = scale.toLowerCase();
    
    // Find the first available input in the specified scale
    cy.get(`input[data-side="${scalePrefix}"]`)
      .filter((index, input) => !input.value) 
      .first() 
      .type(barNumber.toString()); 
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
  
Cypress.Commands.add('getWeighingsList', () => {
    return cy.get('.game-info ol li').then(($listItems) => {
        return Cypress.$.makeArray($listItems).map((li) => li.innerText.trim());
    });
});

Cypress.Commands.add('getAlertMessage', () => {
    // Stub for capturing window alerts
    const stub = cy.stub();
    cy.on('window:alert', stub);

    return stub;
});

Cypress.Commands.add('waitForTextUpdate', (selector, expectedTexts, timeout = 5000) => {
    cy.get(selector, { timeout })
      .should('be.visible')
      .should(($el) => {
        const actualText = $el.text().trim();
        expect(expectedTexts).to.include(
          actualText,
          `The text "${actualText}" was not found in the list of expected texts.`
        );
      });
  });
  