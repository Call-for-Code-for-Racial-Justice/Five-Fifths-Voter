/* eslint no-undef: 0 */
describe("why vote test", () => {
  it("should have why vote content", () => {
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
    cy.contains("Why vote?");
  });
});
