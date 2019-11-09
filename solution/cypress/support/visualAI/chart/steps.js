/// <reference types = "Cypress" />
/// <reference types="@applitools/eyes-cypress" />

export function verifyChart() {
  
  cy.get("[id='showExpensesChart']")
    .should("be.visible")
    .click();

  //waiting for image to finish animating, couldn't find a way to make this wait dynamically
  cy.wait(1000);

  cy.eyesCheckWindow({
    tag: "Bar chart comparing the expenses for the year 2017 and 2018",
    target: 'region',
    selector: {
      type: 'css',
      selector: "[id='canvas']"
    }
  });

  cy.get("[id='addDataset']")
    .should("be.visible")
    .click();

  //waiting for image to finish animating, couldn't find a way to make this wait dynamically
  cy.wait(1000);

  cy.eyesCheckWindow({
    tag: "Bar chart comparing the expenses for the year 2017 2018 and 2019",
    target: 'region',
    selector: {
      type: 'css',
      selector: "[id='canvas']"
    }
  });

}
