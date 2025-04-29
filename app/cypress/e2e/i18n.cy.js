/* eslint no-undef: 0 */
describe("smoke test", () => {
  it("should have i18n content", () => {
    cy.visit("/");
    cy.get("#values").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#mission").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top-journey-button").click();
    cy.get("#language-es").should("not.be.visible");
    cy.get("#header-language-button").click();
    cy.get("#language-es").click();
    cy.get("#language-es").should("not.be.visible");
    cy.contains("Información electoral para");
    cy.get("#header-language-button").click();
    cy.get("#language-en").click();
    cy.contains("Election information for");
  });
});
