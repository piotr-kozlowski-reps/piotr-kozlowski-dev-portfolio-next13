import data from "../../data/data.json";
import { TProjectDetails } from "../../types/typings";

////vars
const projectsDetails: TProjectDetails[] = data.projectsDetails;
const numberOfProjects = projectsDetails.length;

console.log(numberOfProjects);

const projectsSelector = '[data-testid="projects-section"]';
const projectsTitleSelector = '[data-testid="projects-section-title"]';
const projectsNumbersImageSelector = '[data-testid="projects-numbers-image"]';
const projectsImage001Selector = '[data-testid="projects-image-001"]';
const projectsImage002Selector = '[data-testid="projects-image-002"]';
const projectsImage003Selector = '[data-testid="projects-image-003"]';
const projectsImage004Selector = '[data-testid="projects-image-004"]';
const projectTitleSelector = '[data-testid="project-title"]';
const projectDescriptionSelector = '[data-testid="project-description"]';
const projectTechnologiesSelector = '[data-testid="project-technologies"]';
const projectIconsSelector = '[data-testid="project-github-icon"]';

////tests
describe("projects section", () => {
  beforeEach(() => {
    cy.viewport(1024, 800);
    cy.visit("http://localhost:3000");
    cy.get(projectsSelector).scrollIntoView();
  });

  it("shows projects section", () => {
    cy.get(projectsSelector).should("exist");
    cy.get(projectsSelector).should("be.visible");
  });

  it("shows projects section image at the beginning", () => {
    cy.get(projectsTitleSelector).should("exist");
    cy.get(projectsTitleSelector).should("have.attr", "src", "portfolio.svg");
  });

  it("shows projects elements with the number got from data array provided", () => {
    cy.get(projectsNumbersImageSelector).should("exist");
    cy.get(projectsImage001Selector).should("exist");
    cy.get(projectsImage002Selector).should("exist");
    cy.get(projectsImage003Selector).should("exist");
    cy.get(projectsImage004Selector).should("exist");

    cy.get(projectTitleSelector).should("exist");
    cy.get(projectDescriptionSelector).should("exist");
    cy.get(projectTechnologiesSelector).should("exist");
    cy.get(projectIconsSelector).should("exist");

    cy.get(projectsNumbersImageSelector).should(
      "have.length",
      numberOfProjects
    );
    cy.get(projectsImage001Selector).should("have.length", numberOfProjects);
    cy.get(projectsImage002Selector).should("have.length", numberOfProjects);
    cy.get(projectsImage003Selector).should("have.length", numberOfProjects);
    cy.get(projectsImage004Selector).should("have.length", numberOfProjects);

    cy.get(projectTitleSelector).should("have.length", numberOfProjects);
    cy.get(projectDescriptionSelector).should("have.length", numberOfProjects);
    cy.get(projectTechnologiesSelector).should("have.length", numberOfProjects);
    cy.get(projectIconsSelector).should("have.length", numberOfProjects * 2);
  });

  it("shows proper images and texts per project", () => {
    projectsDetails.forEach((project, index) => {
      const projectNumberURL = `/_next/image?url=%2F${project.numberImageURL.substring(
        1
      )}&w=828&q=75`;

      cy.get(projectsNumbersImageSelector)
        .eq(index)
        .should("have.attr", "src", projectNumberURL);

      cy.get(projectTitleSelector)
        .eq(index)
        .should("have.text", project.projectInfo.projectName);

      cy.get(projectDescriptionSelector)
        .eq(index)
        .should("have.text", project.projectInfo.projectDescription);

      cy.get(projectTechnologiesSelector)
        .eq(index)
        .should("have.text", project.projectInfo.projectTechnologiesUsed);

      const projectImages = project.projectImages;

      projectImages.forEach((image, index_in) => {
        console.log(image, index_in);

        if (index_in === 0) {
          cy.get(projectsImage001Selector)
            .eq(index)
            .invoke("attr", "src")
            .should("contain", image.imageUrl.substring(1));
        }

        if (index_in === 1) {
          cy.get(projectsImage002Selector)
            .eq(index)
            .invoke("attr", "src")
            .should("contain", image.imageUrl.substring(1));
        }

        if (index_in === 2) {
          cy.get(projectsImage003Selector)
            .eq(index)
            .invoke("attr", "src")
            .should("contain", image.imageUrl.substring(1));
        }

        if (index_in === 3) {
          cy.get(projectsImage004Selector)
            .eq(index)
            .invoke("attr", "src")
            .should("contain", image.imageUrl.substring(1));
        }
      });
    });
  });
});

export {};
