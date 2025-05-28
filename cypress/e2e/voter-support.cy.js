/* eslint no-undef: 0 */
describe("voter support test", () => {
  it("should have voter support content", () => {
    cy.visit("/");
    cy.get("#values").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#mission").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top-journey-button").click();
    cy.get("#ff-header-menu svg").click();
    cy.get("#side-nav-support").click();
    cy.url().should("contain", "/voterSupport");
    cy.get(".cv-link").should("have.length.gte", 6);
  });
});
