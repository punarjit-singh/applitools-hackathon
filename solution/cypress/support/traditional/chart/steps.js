/// <reference types = "Cypress" />

import { chart } from "./pageElements";

export function verifyChart() {
  cy.get(chart.lnkCompareExpenses)
    .should("be.visible")
    .click();

  cy.get(chart.imgChartCanvas).should("be.visible");

  cy.get(chart.btnShowDataNxtYr)
    .should("be.visible")
    .click();

  cy.get(chart.imgChartCanvas).should("be.visible");
}
