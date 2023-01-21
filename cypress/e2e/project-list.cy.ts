import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
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
  });
});
