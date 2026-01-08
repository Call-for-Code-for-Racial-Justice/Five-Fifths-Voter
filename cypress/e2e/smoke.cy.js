/* eslint no-undef: 0 */
describe("smoke test", () => {
  it("should have basic content", () => {
    cy.visit("/");
    cy.get("#values").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#mission").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top-journey-button");
    cy.get("#ff-header-menu svg").click();
    cy.get("#side-nav-values").click();

    cy.get(':nth-child(1) > input').click();
    cy.get("#item-education").should("be.visible");

    cy.get(':nth-child(2) > input').click();
    cy.get("#item-empower").should("be.visible");

    cy.get(':nth-child(3) > input').click();
    cy.get("#item-enable").should("be.visible");
  });
});
