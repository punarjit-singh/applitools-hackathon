/// <reference types="Cypress" />

import * as loginSteps from "../support/traditional/login/steps";
import * as homeSteps from "../support/traditional/home/steps";
import * as chartSteps from "../support/traditional/chart/steps";
const logins = require("../fixtures/login.json");
const validLogin = logins.find(login => login.test === "hasUsernamePassword");

context("Applitools Visual AI Rockstar Hackathon", () => {

  describe("Login Page UI Elements Tests", () => {

    before(() => {
      cy.visit("/");
    });

    describe("logo and header text", () => {
      loginSteps.verifyLogoAndHeader();
    });

    describe("Default and hidden alerts", () => {
      loginSteps.verifyEmptyAlerts();
    });

    describe("empty login form", () => {
      loginSteps.verifyEmptyLoginForm();
    });

  });
  
  describe("Data-Driven Test", () => {

    beforeEach(() => {
      cy.visit("/");
    });

    logins.forEach(login => {
      if (login.skip) return;
      loginSteps.verifyLoginAttempts(login);
    });

  });

  describe("Table Sort Test", () => {

    before(() => {

      cy.visit("/");

      loginSteps.attemptLogin(validLogin);

    });

    it("amounts should be in ascending order and each row is intact after sorting", () => {
      homeSteps.verifyTransactionTableSort();
    });

  });

  describe("Canvas Chart Test", () => {

    before(() => {

      cy.visit("/");

      loginSteps.attemptLogin(validLogin);

    });

    it("should have correct data in the bar chart", () => {

      /*
      verifyChart() only checks if the canvas is visible
      Unable to automate tests using traditional technique to validate:
      - that the bar chart and representing that data (number of bars and their heights) are correct
      - that new data set is added for the year 2019
      */
      chartSteps.verifyChart();

    });
  });

  describe("Dynamic Content Test", () => {

    before(() => {

      cy.visit(Cypress.env("showAd"));

      loginSteps.attemptLogin(validLogin);

    });

    homeSteps.verifyDynamicAdGifs();
    
  });
});
