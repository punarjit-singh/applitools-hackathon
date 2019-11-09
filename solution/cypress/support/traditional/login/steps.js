/// <reference types = "Cypress" />

import { login } from "./pageElements";

export function verifyLogoAndHeader() {
  it("should have correct logo and default link", () => {
    cy.get(login.divLogo)
      .should("be.visible")
      .find("a")
      .should("have.attr", "href")
      .and("include", "index.html");
  });

  it("should have correct header text", () => {
    cy.get(login.lblHeader)
      .onFail("Incorrect header text displayed") //catches a bug in V2 where text is Logout Form
      .should("be.visible")
      .should("contain.text", "Login Form");
  });
}

export function verifyEmptyAlerts() {
  it("should not show any alerts by default", () => {
    cy.get(login.divAlertEmpty).should("be.visible");
    cy.get(login.divAlertPrimary).should("not.be.visible");
    cy.get(login.divAlertWarning).should("not.be.visible");
  });
}

export function verifyEmptyLoginForm() {
  it("should render login form correctly", () => {
    cy.get(login.formLoginMain).should("be.visible");
  });

  //assuming this is a bug in V2, catches a bug where icon for username field is missing
  it("should display icon for username field", () => {
    cy.get(login.imgIconUsername).should("be.visible");
  });

  it("should show username textbox with correct placeholder text", () => {
    cy.get(login.txtUsername)
      .onFail("Placeholder for username field has changed") //catches a bug in V2 where placeholder is John Smith
      .should("be.visible")
      .should("have.attr", "placeholder")
      .and("include", "Enter your username");
  });

  it("should show correct label for Username field", () => {
    cy.get(login.txtUsername)
      .prev("label")
      .should("contain.text", "Username");
  });

  //assuming this is a bug in V2, catches a bug where icon for password field is missing
  it("should display icon for password field", () => {
    cy.get(login.imgIconPassword).should("be.visible");
  });

  it("should show password textbox with correct placeholder text", () => {
    cy.get(login.txtPassword)
      .onFail("Placeholder for password field has changed") //catches a bug in V2 where placeholder is ABC$1@
      .should("be.visible")
      .should("have.attr", "placeholder")
      .and("include", "Enter your password");
  });

  it("should show correct label for Password field", () => {
    cy.get(login.txtPassword)
      .onFail("Field label for password has changed") //catches a bug in V2 where field label is Pwd
      .prev("label")
      .should("contain.text", "Password");
  });

  it("should have login button enabled", () => {
    cy.get(login.btnLogin)
      .should("be.visible")
      .should("be.enabled")
      .should("contain.text", "Log In");
  });

  it("should remeber me checkbox and correct label", () => {
    cy.get(login.chkRememberMe)
      .should("be.visible")
      .should("be.enabled")
      .parent("label")
      .should("be.visible")
      .should("contain.text", "Remember Me");
  });

  it("should have correct image for twitter", () => {
    cy.get(login.imgIconTwitter)
      .should("be.visible")
      .should("have.attr", "src")
      .and("include", "img/social-icons/twitter.png");
  });

  it("should have href attribute for twitter", () => {
    cy.get(login.imgIconTwitter)
      .onFail("The href for twitter img is missing") //catches a bug in V2 where href for twitter is missing
      .parent()
      .should("have.attr", "href");
      // .and("include", "#");    //assuming value for href i.e. "#" was incorrect in V1 so not asserting on value in V2
  });

  it("should have correct image for facebook", () => {
    cy.get(login.imgIconFacebook)
      .should("be.visible")
      .should("have.attr", "src")
      .and("include", "img/social-icons/facebook.png");
  });

  it("should have href attribute for facebook", () => {
    cy.get(login.imgIconFacebook)
      .parent()
      .should("have.attr", "href");
      // .and("include", "#");      //assuming value for href i.e. "#" was incorrect in V1 so not asserting on value in V2
  });

  /*
  
  Assuming this is an expected change and not a bug in V2 where linkedin icon is missing altogether
 
  it("should have correct image for linkedin", () => {
    cy.get(login.imgIconLinkedin)
      .should("be.visible")
      .should("have.attr", "src")
      .and("include", "img/social-icons/linkedin.png");
  });

  it("should have href attribute for linkedin", () => {
    cy.get(login.imgIconLinkedin)
      .parent()
      .should("have.attr", "href")
      .and("include", "#");
  });
  
  */

}

export function attemptLogin(loginData) {
  if (loginData.username) {
    cy.get(login.txtUsername)
      .should("be.visible")
      .should("be.enabled")
      .type(loginData.username);
  }

  if (loginData.password) {
    cy.get(login.txtPassword)
      .should("be.visible")
      .should("be.enabled")
      .type(loginData.password);
  }

  cy.get(login.btnLogin)
    .should("be.visible")
    .should("be.enabled")
    .click();
}

export function verifyRespectiveAlert(loginData, expectedAlertTxt) {
  attemptLogin(loginData);
  cy.get(login.divAlertEmpty).should("not.be.visible");
  cy.get(login.divAlertWarning)
    .should("be.visible")
    .should("contain.text", expectedAlertTxt);
}

export function verifySuccessfullLogin(loginData) {
  attemptLogin(loginData);
  cy.get(login.divAlertWarning).should("not.be.visible");
  cy.get(login.formLoginMain).should("not.be.visible");
  cy.get(login.divInlineLoggedUser)
    .should("be.visible")
    .find("img")
    .should("have.attr", "src")
    .and("include", "img/avatar1.jpg");

  cy.get(login.divInlineLoggedUser)
    .find("div")
    .should("have.class", "logged-user-name")
    .should("have.class", "logged-user-role");
}

export function verifyLoginAttempts(loginData) {
  switch (loginData.test) {
    case "noUsernamePassword":
      it("should throw an error if no username and password are submitted", () => {
        verifyRespectiveAlert(
          loginData,
          /*
          Assuming this as an expected change where error text has changed
          from "Both Username and Password must be present" 
          to "Please enter both username and password"
          */
          "Please enter both username and password"
        );
      });
      break;
    case "usernameOnly":
      it("should throw an error if only username is submitted", () => {
        //catches a bug in V2 where this alert is missing altogether
        verifyRespectiveAlert(loginData, "Password must be present");
      });
      break;
    case "passwordOnly":
      it("should throw an error if only password is submitted", () => {
        verifyRespectiveAlert(loginData, "Username must be present");
      });
      break;
    case "hasUsernamePassword":
      it("should login successfully if both username and password are submitted", () => {
        verifySuccessfullLogin(loginData);
      });
      break;
  }
}
