/// <reference types = "Cypress" />

import { home } from "./pageElements";

function getTransactions(doSort) {
  let cellContents = [];
  let transaction = [];
  new Cypress.Promise(resolve => {
    cy.get("table tbody tr")
      .children()
      .each(($el, $index) => {
        const text = $el.text().trim();
        if ($index % 5 === 0) {
          transaction = [];
        }
        transaction.push(text);
        if (($index + 1) % 5 === 0 && $index != 0) {
          cellContents.push(transaction);
          transaction = [];
        }
      })
      .then(() => {
        if (doSort) {
          cellContents.sort(compareAmounts);
        }
        resolve(cellContents);
      });
  });
  return cellContents;
}

function compareAmounts(a, b) {
  var amtA = parseFloat(
    a[4]
      .replace(/ /g, "")
      .replace(",", "")
      .replace("USD", "")
  );

  var amtB = parseFloat(
    b[4]
      .replace(/ /g, "")
      .replace(",", "")
      .replace("USD", "")
  );

  if (amtA < amtB) {
    return -1;
  }
  if (amtA > amtB) {
    return 1;
  }
  return 0;
}

export function verifyTransactionTableSort() {
  const original = getTransactions(true);

  cy.get(home.lnkAmount)
    .should("be.visible")
    .click();

  cy.wrap(getTransactions())
    .onFail("Table is not sorted properly based on amounts") //catches a bug in V2 where table is not sorted properly based on amounts
    .should("be.deep.equal", original);
}

export function verifyDynamicAdGifs() {
  //catches a bug in V2 where sale gif is missing altogether
  it("should display sale one gif correctly", () => {
    cy.get(home.imgFlashSaleOne)
      .should("be.visible")
      .should("have.attr", "src")
      .and("include", "Sale")
      .and("include", ".gif");
  });

  it("should display sale two gif correctly", () => {
    cy.get(home.imgFlashSaleTwo)
      .should("be.visible")
      .should("have.attr", "src")
      .and("include", "Sale")
      .and("include", ".gif");
  });
}
