// cypress/e2e/fetch_spic.cy.js

/* 
    1. find the best algorithm to find the fake
    2. Test automation:
        a. click on buttons: "weigh", "reset" 
        b. get measurement results
        c. fill out bowl grids with 0-8 bars 
        d. get list of weighings
        e. click on bar and check alert message
    3. perform e2e from step 1 using actions from step 2
    output: alert message, number of weighings, list of weighings
  */

describe('Find the Fake Gold Bar Game', () => {
    beforeEach(() => {
      cy.visit('http://sdetchallenge.fetch.com/'); 
    });
  
    const findFakeBar = (bars) => {
      if (bars.length === 1) {
        return bars[0]; // Base case: only one bar left, it must be the fake one
      }
  
      // Split bars into three groups
      const third = Math.ceil(bars.length / 3);
      const group1 = bars.slice(0, third);
      const group2 = bars.slice(third, 2 * third);
      const group3 = bars.slice(2 * third);
  
      // Weigh group1 against group2
      cy.clearScales();
      group1.forEach((bar) => cy.addBarToScale(bar, 'left'));
      group2.forEach((bar) => cy.addBarToScale(bar, 'right'));
      cy.clickWeighButton();

      // the scale result needs a moment to render
      cy.waitForTextUpdate('.result button', ['<', '>', '=']);

      // This wait is for us humans to make it more watchable
      cy.wait(3000);
  
      // Determine which group contains the fake bar
      return cy.getResult().then((result) => {
        console.log(result); // Log to the browser's console
        if (result.includes('<')) {
          return findFakeBar(group1);
        } else if (result.includes('>')) {
          return findFakeBar(group2);
        } else {
          return findFakeBar(group3);
        }
      });
    };
  
    it('should find the fake bar using a recursive algorithm', () => {
      const bars = Array.from({ length: 9 }, (_, i) => i);
      
      findFakeBar(bars).then((fakeBar) => {
        // Click the coin that corresponds to the fake bar
        cy.get(`#coin_${fakeBar}`).click();
    
        // Verify the alert message
        cy.on('window:alert', (text) => {
          console.log(text);
          expect(text).to.contains(`Yay! You find it!`);
        });

        // Get list of weighings
        cy.getWeighingsList().then((weighings) => {
          console.log(weighings.length, 'Total weighings.');
          console.log('Weighings:', weighings);
          expect(weighings).to.have.length.greaterThan(0);
        });
          
    });
    
    it('should fill out the bowls grids', () => {
      // Fill the left and right bowl grids with numbers 0-8
      for (let i = 0; i <= 8; i++) {
        cy.get(`#left_${i}`).type(`${i}`);
        cy.get(`#right_${i}`).type(`${i}`);
      }
    });
  
    it('should click on the "Reset" button and verify scales and weighings are cleared', () => {
      // make a measuring
      cy.get(`#left_0`).type(`0`);
      cy.get(`#right_0`).type(`1`);
      cy.get('#weigh').click();
      cy.waitForGameUpdate(); 
  
      // Click the Reset button
      // TODO: there are two buttons with the same id of 'reset'
      cy.get('button#reset').eq(1).click();
  
      // Verify the scales are empty
      for (let i = 0; i <= 8; i++) {
        cy.get(`#left_${i}`).should('have.value', '');
        cy.get(`#right_${i}`).should('have.value', '');
      }
  
      // Verify the weighings list is cleared
      cy.get('.game-info ol li').should('not.exist');
    });   

    it('should display an alert for invalid input when placing the same unique bar on both scales', () => {
      // Place the same unique bar on both scales
      cy.get(`#left_0`).type('0');
      cy.get(`#right_0`).type('0');
    
      // Click the Weigh button
      cy.get('#weigh').click();
    
      // Verify the alert message
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Inputs are invalid: Both sides have coin(s): 0');
      });
    });    
  
    it('should click on a each bar and check alert message', () => {
      const bars = Array.from({ length: 9 }, (_, i) => i);
      
      findFakeBar(bars).then((fakeBar) => {
        // Setup a stub to listen to alert events
      const stub = cy.stub();
      cy.on('window:alert', stub);
  
      // Click on each coin button and check the alert message
      for (let i = 0; i <= 8; i++) {
        cy.get(`#coin_${i}`)
          .click()
          .then(() => {
            if (i === fakeBar) {
              expect(stub.getCall(i)).to.be.calledWith(`Yay! You find it!`)
            }
            else {
              expect(stub.getCall(i)).to.be.calledWith(`Oops! Try Again!`)
            }
          });
        }
      }); 
    });
  });
  
});
