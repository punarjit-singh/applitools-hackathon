/// <reference types = "Cypress" />
/// <reference types="@applitools/eyes-cypress" />

export function verifyTransactionTableSort() {

  cy.get("[id='amount']")
    .should("be.visible")
    .click();

  cy.eyesCheckWindow({
    tag: "Table sort",
    target: 'region',
    selector: {
      type: 'css',
      selector: "[class^='element-wrapper']:not([class*='compact'])"
    }
  });
  
}

export function verifyDynamicAdGifs() {

  cy.eyesCheckWindow({
    tag: "Dynamic ad gifs",
    target: 'region',
      selector: {
        type: 'css',
        selector: ".element-balances"
      }
  });

}
