Cypress.Commands.add(
  "onFail",
  { prevSubject: true },
  (chainedSubject, message) => {
    cy.on("fail", (error, runnable) => {
      error.name = "CustomError";
      error.message = message;
      throw error;
    });
    return chainedSubject;
  }
);
