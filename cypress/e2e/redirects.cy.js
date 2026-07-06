describe("redirects", () => {
  it("should redirect old candidate page to new structure", () => {
    cy.visit("/journey/election/ga-2026-midterms/candidates/ga-governor-2026");
    cy.url().should("eq", "http://localhost:4007/journey/election/five-fifths-details/ga-2026-midterms/ga-governor-2026");
  });
  it("should redirect old candidate score page to new structure", () => {
    cy.visit("/journey/election/ga-2026-midterms/candidates/ga-governor-2026/score/keisha-lance-bottoms");
    cy.url().should("eq", "http://localhost:4007/journey/election/five-fifths-details/ga-2026-midterms/ga-governor-2026/keisha-lance-bottoms");
  });
  it("should redirect old simplified candidate score page to new structure", () => {
    cy.visit("/journey/election/ga-2026-midterms/candidates/score/keisha-lance-bottoms");
    cy.url().should("eq", "http://localhost:4007/journey/election/five-fifths-details/ga-2026-midterms/r/keisha-lance-bottoms");
  });
});
