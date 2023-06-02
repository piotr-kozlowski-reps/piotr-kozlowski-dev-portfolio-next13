////vars
const navigationDesktopSelector = '[data-testid="nav-desktop"]';
const navigationDesktopHomeSelector = '[data-testid="nav-desktop-home"]';
const navigationDesktopAboutSelector = '[data-testid="nav-desktop-about"]';
const navigationDesktopProjectsSelector =
  '[data-testid="nav-desktop-projects"]';
const navigationDesktopContactSelector = '[data-testid="nav-desktop-contact"]';
const navigationDesktopGithubSelector = '[data-testid="nav-desktop-github"]';
const navigationDesktopLinkedSelector = '[data-testid="nav-linkedin-github"]';

const navigationMobileHamburgerSelector =
  '[data-testid="nav-mobile-hamburger"]';
const navigationMobileXSelector = '[data-testid="nav-mobile-x"]';
const navigationMobileHomeSelector = '[data-testid="nav-mobile-home"]';
const navigationMobileAboutSelector = '[data-testid="nav-mobile-about"]';
const navigationMobileProjectsSelector = '[data-testid="nav-mobile-projects"]';
const navigationMobileContactSelector = '[data-testid="nav-mobile-contact"]';
const navigationMobileGithubSelector = '[data-testid="nav-mobile-github"]';
const navigationMobileLinkedSelector = '[data-testid="nav-mobile-linkedin"]';

////tests
describe("navigation in desktop / tablet", () => {
  beforeEach(() => {
    cy.viewport(1024, 800);
    cy.visit("http://localhost:3000");
    cy.wait(400);
  });

  it("shows navigation in desktop, shows every link, shows icons", () => {
    cy.get(navigationDesktopSelector).should("exist");
    cy.get(navigationDesktopSelector).should("be.visible");

    cy.get(navigationDesktopHomeSelector).should("exist");
    cy.get(navigationDesktopHomeSelector).should("be.visible");

    cy.get(navigationDesktopAboutSelector).should("exist");
    cy.get(navigationDesktopAboutSelector).should("be.visible");

    cy.get(navigationDesktopProjectsSelector).should("exist");
    cy.get(navigationDesktopProjectsSelector).should("be.visible");

    cy.get(navigationDesktopContactSelector).should("exist");
    cy.get(navigationDesktopContactSelector).should("be.visible");

    cy.get(navigationDesktopGithubSelector).should("exist");
    cy.get(navigationDesktopGithubSelector).should("be.visible");

    cy.get(navigationDesktopLinkedSelector).should("exist");
    cy.get(navigationDesktopLinkedSelector).should("be.visible");
  });

  it("hides navigation in desktop, when resolution changed to mobile", () => {
    cy.wait(100);
    cy.viewport(650, 800);
    cy.wait(3000);

    cy.get(navigationDesktopSelector).should("exist");
    // cy.get(navigationDesktopSelector).should("not.be.visible");

    cy.get(navigationDesktopHomeSelector).should("exist");
    cy.get(navigationDesktopHomeSelector).should("not.be.visible");

    cy.get(navigationDesktopAboutSelector).should("exist");
    cy.get(navigationDesktopAboutSelector).should("not.be.visible");

    cy.get(navigationDesktopProjectsSelector).should("exist");
    cy.get(navigationDesktopProjectsSelector).should("not.be.visible");

    cy.get(navigationDesktopContactSelector).should("exist");
    cy.get(navigationDesktopContactSelector).should("not.be.visible");

    cy.get(navigationDesktopGithubSelector).should("exist");
    cy.get(navigationDesktopGithubSelector).should("not.be.visible");

    cy.get(navigationDesktopLinkedSelector).should("exist");
    cy.get(navigationDesktopLinkedSelector).should("not.be.visible");
  });
});

describe("navigation in mobile", () => {
  beforeEach(() => {
    cy.viewport(450, 721);
    cy.visit("http://localhost:3000");
    cy.wait(400);
  });

  it("should not show desktop navigation elements", () => {
    cy.get(navigationDesktopSelector).should("exist");
    cy.get(navigationDesktopSelector).should("be.visible");

    cy.get(navigationDesktopHomeSelector).should("exist");
    cy.get(navigationDesktopHomeSelector).should("not.be.visible");

    cy.get(navigationDesktopAboutSelector).should("exist");
    cy.get(navigationDesktopAboutSelector).should("not.be.visible");

    cy.get(navigationDesktopProjectsSelector).should("exist");
    cy.get(navigationDesktopProjectsSelector).should("not.be.visible");

    cy.get(navigationDesktopContactSelector).should("exist");
    cy.get(navigationDesktopContactSelector).should("not.be.visible");

    cy.get(navigationDesktopGithubSelector).should("exist");
    cy.get(navigationDesktopGithubSelector).should("not.be.visible");

    cy.get(navigationDesktopLinkedSelector).should("exist");
    cy.get(navigationDesktopLinkedSelector).should("not.be.visible");
  });

  it("should show hamburger menu", () => {
    cy.wait(200);
    cy.get(navigationMobileHamburgerSelector).should("exist");
    cy.get(navigationMobileXSelector).should("exist");
  });

  it("not show mobile links until hamburger is clicked", () => {
    cy.wait(200);
    cy.get(navigationMobileHamburgerSelector).should("exist");

    cy.get(navigationMobileHomeSelector).should("exist");
    cy.get(navigationMobileHomeSelector).should("not.be.visible");

    cy.get(navigationMobileAboutSelector).should("exist");
    cy.get(navigationMobileAboutSelector).should("not.be.visible");

    cy.get(navigationMobileProjectsSelector).should("exist");
    cy.get(navigationMobileProjectsSelector).should("not.be.visible");

    cy.get(navigationMobileContactSelector).should("exist");
    cy.get(navigationMobileContactSelector).should("not.be.visible");

    cy.get(navigationMobileGithubSelector).should("exist");
    cy.get(navigationMobileGithubSelector).should("not.be.visible");

    cy.get(navigationMobileLinkedSelector).should("exist");
    cy.get(navigationMobileLinkedSelector).should("not.be.visible");
  });

  it("show mobile links when hamburger is clicked and hide after clicking hamburger(X icon) again", () => {
    cy.wait(200);
    cy.get(navigationMobileHamburgerSelector).should("exist");
    cy.get(navigationMobileHamburgerSelector).click({ force: true });
    cy.wait(500);

    cy.get(navigationMobileHomeSelector).should("exist");
    cy.get(navigationMobileHomeSelector).should("be.visible");

    cy.get(navigationMobileAboutSelector).should("exist");
    cy.get(navigationMobileAboutSelector).should("be.visible");

    cy.get(navigationMobileProjectsSelector).should("exist");
    cy.get(navigationMobileProjectsSelector).should("be.visible");

    cy.get(navigationMobileContactSelector).should("exist");
    cy.get(navigationMobileContactSelector).should("be.visible");

    cy.get(navigationMobileGithubSelector).should("exist");
    cy.get(navigationMobileGithubSelector).should("be.visible");

    cy.get(navigationMobileLinkedSelector).should("exist");
    cy.get(navigationMobileLinkedSelector).should("be.visible");

    cy.get(navigationMobileXSelector).click({ force: true });
    cy.wait(500);

    cy.get(navigationMobileHomeSelector).should("exist");
    cy.get(navigationMobileHomeSelector).should("not.be.visible");

    cy.get(navigationMobileAboutSelector).should("exist");
    cy.get(navigationMobileAboutSelector).should("not.be.visible");

    cy.get(navigationMobileProjectsSelector).should("exist");
    cy.get(navigationMobileProjectsSelector).should("not.be.visible");

    cy.get(navigationMobileContactSelector).should("exist");
    cy.get(navigationMobileContactSelector).should("not.be.visible");

    cy.get(navigationMobileGithubSelector).should("exist");
    cy.get(navigationMobileGithubSelector).should("not.be.visible");

    cy.get(navigationMobileLinkedSelector).should("exist");
    cy.get(navigationMobileLinkedSelector).should("not.be.visible");
  });
});

export {};
