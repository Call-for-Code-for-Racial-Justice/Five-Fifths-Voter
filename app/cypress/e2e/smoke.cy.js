/* eslint no-undef: 0 */
describe("smoke test", () => {
  it("should have basic content", () => {
    cy.visit("/");
    cy.get("#header-menu-our-mission");
    cy.get(
      '[href="https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D"]',
    );
    cy.get(
      '[href="https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter"]',
    );
    cy.get("#header-language-button");
    cy.get("#side-nav");
    // Make sure the icons are working
    cy.get("#ff-header-menu").click();
    cy.get("#side-nav-home svg").should("be.visible");
    cy.get("#side-nav-mission svg").should("be.visible");
    cy.get("#side-nav-journey svg").should("be.visible");
    cy.get("#side-nav-values svg").should("be.visible");
    cy.get("#side-nav-support svg").should("be.visible");
    cy.get("#side-nav-why svg").should("be.visible");
    cy.get("#side-nav-mission").click();
    cy.get("#side-nav-why svg").should("not.be.visible");
    cy.get("#mission-journey-button").should("be.visible");
    cy.get("#ff-header-menu").click();
    cy.get("#side-nav-values").click();
    cy.get("#side-nav-values").should("not.be.visible");
    cy.get("#card-educate").should("be.visible");
    cy.get("[aria-controls=card-educate]").parent().click();
    cy.get("#card-educate").should("not.be.visible");
    cy.get("[aria-controls=card-empower]").parent().click();
    cy.get("#card-empower").should("be.visible");
    cy.get("[aria-controls=card-enable]").parent().click();
    cy.get("#card-empower").should("not.be.visible");
    cy.get("#card-enable").should("be.visible");
  });
  it("should have i18n content", () => {
    cy.visit("/");
    cy.get("#language-es").should("not.be.visible");
    cy.get("#header-language-button").click();
    cy.get("#language-es").click();
    cy.get("#language-es").should("not.be.visible");
    cy.contains("Superar barreras");
    cy.get("#header-language-button").click();
    cy.get("#language-en").click();
    cy.contains("Overcoming barriers");
  });
  it("should have journey content", () => {
    cy.visit("/");
    cy.get("#ff-header-menu svg").click();
    cy.get("#side-nav-journey").click();
    cy.url().should("contain", "/journey");
    cy.get(".cv-tile-clickable").should("have.length", 6);
  });
  it("should have voter support  content", () => {
    cy.visit("/");
    cy.get("#ff-header-menu svg").click();
    cy.get("#side-nav-support").click();
    cy.url().should("contain", "/voterSupport");
    cy.get(".cv-link").should("have.length.gte", 6);
  });
  it("should have why vote  content", () => {
    cy.visit("/");
    cy.get("#ff-header-menu svg").click();
    cy.get("#side-nav-why").click();
    cy.url().should("contain", "/whyVote");
    cy.contains("Why vote?");
  });
  it("should have other header  content", () => {
    cy.visit("/");
    cy.get("#ff-header-menu svg").click();
    cy.get("#side-nav-why").click();
    cy.url().should("contain", "/whyVote");
    cy.get('[href="/"]');
    cy.get(
      '[href="https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D"]',
    );
    cy.get(
      '[href="https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter"]',
    );
    cy.get("#header-language-button");
  });
  it("should have wide header  content", () => {
    cy.viewport("macbook-13");
    cy.visit("/");
    cy.get("#ff-header-menu").should("not.be.visible");
    cy.get("#side-nav-why").should("not.be.visible");
    cy.get("#header-menu-our-mission svg").should("be.visible");
    cy.get("#header-menu-journey svg").should("be.visible");
    cy.get("#header-menu-our-values svg").should("be.visible");
    cy.get("#header-menu-support svg").should("be.visible");
    cy.get("#header-menu-why").click();
    cy.url().should("contain", "/whyVote");
    cy.get("#header-menu-our-mission").should("be.visible");
    cy.get('[href="/"]');
    cy.get(
      '[href="https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D"]',
    );
    cy.get(
      '[href="https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter"]',
    );
    cy.get("#header-language-button");
  });
});
