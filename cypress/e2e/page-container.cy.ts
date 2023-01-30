describe("Page Container", () => {
  beforeEach(() => {
    // open issues page
    cy.visit(`http://localhost:3000/dashboard`);
    cy.viewport(1025, 900);
  });

  it("renders footer elements correctly", () => {
    cy.get('[data-cy="page-content-footer"]').contains(
      `Version: ${Cypress.env("npm_package_version")}`
    );

    cy.get("ul").contains("Docs").should("have.attr", "href", "/dashboard#");

    cy.get("ul").contains("API").should("have.attr", "href", "/dashboard#");

    cy.get("ul").contains("Help").should("have.attr", "href", "/dashboard#");

    cy.get("ul")
      .contains("Community")
      .should("have.attr", "href", "/dashboard#");

    cy.get('[data-cy="page-content-footer"]')
      .find("img")
      .should("have.attr", "alt", "footer logo small");
  });
});
