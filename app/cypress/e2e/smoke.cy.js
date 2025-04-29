/* eslint no-undef: 0 */
describe("smoke test", () => {
  it("should have basic content", () => {
    cy.visit("/");
    cy.get("#values").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#mission").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top-journey-button");
    cy.get("nav > button").click();
    cy.get("nav > ul > li").last().click();
    cy.get("nav > ul").should("not.exist");

    cy.get("#item-education").should("be.visible");
    cy.get("[aria-controls=item-education]").click();
    cy.get("#item-education").should("not.be.visible");

    cy.get("[aria-controls=item-empower]").click();
    cy.get("#item-empower").should("be.visible");
    cy.get("#item-education").should("not.be.visible");
    cy.get("#item-enable").should("not.be.visible");

    cy.get("[aria-controls=item-enable]").click();
    cy.get("#item-enable").should("be.visible");
    cy.get("#item-education").should("not.be.visible");
    cy.get("#item-empower").should("not.be.visible");
  });
});
