/* eslint no-undef: 0 */
describe("smoke test", () => {
  it("should have why vote content", () => {
    cy.visit("/");
    cy.get("#values").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#mission").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top-journey-button").click();
    cy.get("#ff-header-menu svg").click();
    cy.get("#side-nav-why").click();
    cy.url().should("contain", "/whyVote");
    cy.contains("Why vote?");
  });
});
