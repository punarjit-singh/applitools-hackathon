/// <reference types="Cypress" />
/// <reference types="@applitools/eyes-cypress" />

import * as loginSteps from "../support/visualAI/login/steps";
import * as homeSteps from "../support/visualAI/home/steps";
import * as chartSteps from "../support/visualAI/chart/steps";
const logins = require("../fixtures/login.json");
const validLogin = logins.find(login => login.test === "hasUsernamePassword");

context("Applitools Visual AI Rockstar Hackathon", () => {
  
  describe("Login Page UI Elements Tests", () => {
  
    before(() => {

      cy.visit("/");

      cy.eyesOpen();
  
    });

    after(() => {
      cy.eyesClose();
    });

    it("should render login page correctly", () => {

      cy.eyesCheckWindow("Login Page");

    });
  
  });

  describe("Data-Driven Test", () => {

    beforeEach(() => {

      cy.eyesOpen();

      cy.visit("/");

    });

    afterEach(() => {
      cy.eyesClose();
    });

    logins.forEach(login => {

      if (login.skip) return;

      loginSteps.verifyLoginAttempts(login);

    });

  });

  describe("Table Sort Test", () => {

    before(() => {

      cy.eyesOpen();

      cy.visit("/");

      loginSteps.attemptLogin(validLogin);

    });

    after(() => {
      cy.eyesClose();
    });

    it("amounts should be in ascending order and each row is intact after sorting", () => {
      homeSteps.verifyTransactionTableSort();
    });

  });

  describe("Canvas Chart Test", () => {

    before(() => {

      cy.eyesOpen();

      cy.visit("/");
      
      loginSteps.attemptLogin(validLogin);

    });

    after(() => {
      cy.eyesClose();
    });

    it("should have correct data in the bar chart", () => {
      chartSteps.verifyChart();
    });

  });

  describe("Dynamic Content Test", () => {

    before(() => {

      cy.eyesOpen();

      cy.visit(Cypress.env("showAd"));

      loginSteps.attemptLogin(validLogin);

    });

    after(() => {
      cy.eyesClose();
    });

    it("should display ads correctly", () => {
      
      homeSteps.verifyDynamicAdGifs();

    });
  
  });

});
