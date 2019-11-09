/// <reference types = "Cypress" />
/// <reference types="@applitools/eyes-cypress" />

export function attemptLogin(loginData) {

  if (loginData.username) {

    cy.get("#username")
      .should("be.visible")
      .should("be.enabled")
      .type(loginData.username)
      .should("have.value", loginData.username);
  
  }

  if (loginData.password) {

    cy.get("#password")
      .should("be.visible")
      .should("be.enabled")
      .type(loginData.password)
      .should("have.value", loginData.password);
  
  }

  cy.get("#log-in")
    .should("be.visible")
    .should("be.enabled")
    .click();

}

export function verifyLoginAttempts(loginData) {

  switch (loginData.test) {
  
    case "noUsernamePassword":

      it("should throw an error if no username and password are submitted", () => {

        attemptLogin(loginData);

        cy.eyesCheckWindow("Login page after login attempt with no username and password");

      });
      break;

    case "usernameOnly":
      
      it("should throw an error if only username is submitted", () => {
            
        attemptLogin(loginData);

        cy.eyesCheckWindow("Login page after login attempt with username only");
            
      });
      break;
    
    case "passwordOnly":
    
      it("should throw an error if only password is submitted", () => {
        
        attemptLogin(loginData);

        cy.eyesCheckWindow("Login page after login attempt with password only");
                
      });
      break;
    
    case "hasUsernamePassword":
    
      it("should login successfully if both username and password are submitted", () => {
        
        attemptLogin(loginData);

        /* 
        
        Can assert whole page as well by simply adding the follwing 
        but tried to keep the test independent of other changes on homepage.
        
        Ideally homepage tests should be covered separately and not as part of login tests:

        cy.eyesCheckWindow("Logged in username and avatar after successfull login");
        */

        cy.eyesCheckWindow({
          tag: "Logged in username and avatar after successfull login",
          target: 'region',
          selector: {
            type: 'css',
            selector: "[class*='avatar-inline']"
          }
        });
              
      });
      break;
  }
}
