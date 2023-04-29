import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // checks loading screen
    cy.get('[data-cy="svg-loading-icon"]').should("be.visible");

    // wait for request to resolve
    cy.wait("@getProjects");

    // checks that the loading icon is not visible anymore after projects content has been loaded
    cy.get('[data-cy="svg-loading-icon"]').should("not.exist");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];
      const statusMap = {
        info: {
          name: "Stable",
          color: "rgb(2, 122, 72)",
          bgColor: "rgb(236, 253, 243)",
        },
        warning: {
          name: "Warning",
          color: "rgb(181, 71, 8)",
          bgColor: "rgb(255, 250, 235)",
        },
        error: {
          name: "Critical",
          color: "rgb(180, 35, 24)",
          bgColor: "rgb(254, 243, 242)",
        },
      };

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          const statusInfo =
            statusMap[mockProjects[index].status as keyof typeof statusMap];

          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el)
            .contains(statusInfo.name)
            .should("have.css", "color", statusInfo.color)
            .and("have.css", "background-color", statusInfo.bgColor);
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });

    it("renders an error screen", () => {
      // setup request error
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        forceNetworkError: true,
      }).as("getProjectsError");

      cy.visit("http://localhost:3000/dashboard");

      cy.get('[data-cy="error-screen"]', { timeout: 10000 }).contains(
        "There was a problem while loading the project data"
      );
    });

    it("has a try again button to refetch data, in the error screen", () => {
      // setup request error
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        statusCode: 500,
      }).as("getProjectsError");

      cy.visit("http://localhost:3000/dashboard");

      cy.get('[data-cy="error-screen"]', { timeout: 10000 })
        .contains("Try again")
        .as("try-again-btn");

      cy.get("@try-again-btn").click();

      // wait for request to resolve
      cy.wait("@getProjectsError").its("response.statusCode").should("eq", 500);
    });

    it.only("directs to issues page with pre-selected project filter", () => {
      cy.get("main").find("li:first").find("a").contains("View issues").click();

      cy.wait(500);

      cy.url().should(
        "eq",
        "http://localhost:3000/dashboard/issues?project=Frontend%20-%20Web%20Test"
      );

      cy.get('input[name="issue-project-filter"]').contains(
        "Frontend%20-%20Web%20Test"
      );
    });
  });
});
