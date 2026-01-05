/* eslint no-undef: 0 */
describe("journey test", () => {
  it("should have basic content", () => {
    cy.visit("/journey");
    cy.get(
      "[href=\"https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D\"]",
    );
    cy.get(
      "[href=\"https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter\"]",
    );
    cy.get("#header-language-button");
    cy.get('[id^="nav-card-"]').should('have.length', 5)
  });
  it("should have other header content", () => {
    cy.visit("/");
    cy.get("#ff-header-menu").click();
    cy.wait(500);
    cy.get('#side-nav-values').click();
    cy.wait(500);
    cy.get('#values-journey-button').click();
    cy.url().should("contain", "/journey");

    cy.get("#ff-header-menu").click();
    cy.get("#side-nav-why").click();
    cy.url().should("contain", "/whyVote");
    cy.get("[href=\"/\"]");
    cy.get(
      "[href=\"https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D\"]",
    );
    cy.get(
      "[href=\"https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter\"]",
    );
    cy.get("#header-language-button");
  });
  it("should have wide header content", () => {
    cy.viewport("macbook-13");
    cy.visit("/");
    cy.get("#ff-header-menu").click();
    cy.wait(500);
    cy.get('#side-nav-values').click();
    cy.wait(500);
    cy.get('#values-journey-button').click();
    cy.url().should("contain", "/journey");

    cy.get("#ff-header-menu").should("be.visible");
    cy.get("#side-nav-why").should("not.be.visible");
    cy.get("#ff-header-menu").click();
    cy.get("#side-nav-why").click();
    cy.url().should("contain", "/whyVote");
    cy.get("[href=\"/\"]");
    cy.get(
      "[href=\"https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D\"]",
    );
    cy.get(
      "[href=\"https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter\"]",
    );
    cy.get("#header-language-button");
  });
});
