/* eslint no-undef: 0 */
describe("smoke test", () => {
  it("should have basic content", () => {
    cy.visit("/journey");
    cy.get("#header-menu-our-mission");
    cy.get(
      "[href=\"https://www.instagram.com/fivefifthsvoter/?igshid=Zjc2ZTc4Nzk%3D\"]",
    );
    cy.get(
      "[href=\"https://github.com/Call-for-Code-for-Racial-Justice/Five-Fifths-Voter\"]",
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
    cy.get("#side-nav-support").click();
    cy.get("#side-nav-why svg").should("not.be.visible");
    cy.get("#ff-header-menu").click();
    cy.get("#side-nav-journey").click();
    cy.get(".cv-tile-clickable").should("have.length", 5);
  });
  it("should have other header content", () => {
    cy.visit("/");
    cy.get("#values").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#mission").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top-journey-button").click();

    cy.get("#ff-header-menu svg").click();
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
    cy.get("#values").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#mission").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top").scrollIntoView({ easing: "linear", duration: 200 });
    cy.get("#top-journey-button").click();
    cy.get("#ff-header-menu").should("not.be.visible");
    cy.get("#side-nav-why").should("not.be.visible");
    cy.get("#header-menu-our-mission").should("be.visible");
    cy.get("#header-menu-journey").should("be.visible");
    cy.get("#header-menu-our-values").should("be.visible");
    cy.get("#header-menu-support").should("be.visible");
    cy.get("#header-menu-why").click();
    cy.url().should("contain", "/whyVote");
    cy.get("#header-menu-our-mission").should("be.visible");
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
