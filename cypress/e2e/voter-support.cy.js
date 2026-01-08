/* eslint no-undef: 0 */
describe("voter support test", () => {
  it("should have voter support content", () => {
    cy.visit("/");
    cy.get("#ff-header-menu").click();
    cy.wait(500);
    cy.get('#side-nav-values').click();
    cy.wait(500);
    cy.get('#values-journey-button').click();
    cy.url().should("contain", "/journey");

    cy.get("#ff-header-menu").click();
    cy.get("#side-nav-support").click();
    cy.url().should("contain", "/voterSupport");
    cy.get(".link").should("have.length.gte", 6);
  });
});
