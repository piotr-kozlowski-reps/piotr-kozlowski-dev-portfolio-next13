////vars
const footerSelector = '[data-testid="footer-section"]';
const footerImageSelector = '[data-testid="footer-image"]';
const footerImageGithubSelector = '[data-testid="footer-image-github"]';
const footerImageLinkedinSelector = '[data-testid="footer-image-linkedin"]';
const footerPhone = '[data-testid="footer-phone-button"]';

////tests
describe("show footer", () => {
  beforeEach(() => {
    cy.viewport(1024, 800);
    cy.visit("http://localhost:3000");
    cy.get(footerSelector).should("exist");
    cy.get(footerSelector).scrollIntoView();
  });

  it("show logotype image", () => {
    cy.get(footerSelector).should("be.visible");
    cy.get(footerImageSelector)
      .should("exist")
      .should(
        "have.attr",
        "src",
        "/_next/image?url=%2Flogo_transparency%201.png&w=384&q=75"
      );
  });

  it("show github image", () => {
    cy.get(footerSelector).should("be.visible");
    cy.get(footerImageSelector)
      .should("exist")
      .should(
        "have.attr",
        "src",
        "/_next/image?url=%2Flogo_transparency%201.png&w=384&q=75"
      );
  });

  it("show email", () => {
    cy.get(footerSelector).should("be.visible");
    cy.get(footerSelector).should(
      "include.text",
      "piotr.kozlowski@dev.ante.pl"
    );
  });

  it("show number shortened and full when clicked", () => {
    cy.get(footerSelector).should("be.visible");
    cy.get(footerPhone).should("include.text", "+48 ... show number");
    cy.get(footerPhone).should("exist");
    cy.get(footerPhone).click({ force: true });
    cy.get(footerPhone).should("include.text", "+48 691 235 259");
  });

  it("show show footers github icon", () => {
    cy.get(footerImageGithubSelector)
      .should("exist")
      .should("have.attr", "src", "github.svg");
  });

  it("show show footers github icon hover", () => {
    cy.get(footerImageGithubSelector)
      .should("exist")
      .trigger("mouseover")
      .wait(1200)
      .should("have.attr", "src", "gitHub_hover.svg");
  });

  it("show show footers linked icon", () => {
    cy.get(footerImageLinkedinSelector)
      .should("exist")
      .should("have.attr", "src", "linkedIn.svg");
  });

  it("show show footers linked icon hover", () => {
    cy.get(footerImageLinkedinSelector)
      .should("exist")
      .should("have.attr", "src", "linkedIn.svg")
      .trigger("mouseover")
      .wait(1100)
      .should("have.attr", "src", "linkedIn_hover.svg");
  });
});
