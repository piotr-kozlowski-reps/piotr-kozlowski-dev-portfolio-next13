const modalSelector = '[data-testid="modal"]';
const modalInsideSelector = '[data-testid="modal-inside"]';
const buttonSelector = '[data-testid="modal-inside"] button';

describe("show modal when height of browser window is too small on desktops ", () => {
  beforeEach(() => {
    cy.viewport(1024, 719);
    cy.visit("http://localhost:3000");
  });

  it("show modal when height is too small", () => {
    cy.get(modalSelector).should("be.visible");
    cy.get(modalInsideSelector).should("be.visible");

    //text
    cy.get(modalInsideSelector).should(
      "include.text",
      "This site was thought to consume more pixels in vertical direction."
    );
    cy.get(modalInsideSelector).should(
      "include.text",
      "It needs that so badly, that looking at it, when window height is lower than expected, can injure your eye with painfully invisible content."
    );
  });

  it("show modal and have button hide", () => {
    //button
    cy.get(buttonSelector).should("be.visible").should("include.text", "hide");
  });

  it("should hide when button clicked", () => {
    //button
    cy.get(buttonSelector).click();
    cy.get(modalSelector).should("not.be.visible");
    cy.get(modalInsideSelector).should("not.be.visible");
  });
});

describe("show modal when height of browser window is too small in mobiles", () => {
  beforeEach(() => {
    cy.viewport(500, 599);
    cy.visit("http://localhost:3000");
  });

  it("show modal when height is too small", () => {
    cy.get(modalSelector).should("be.visible");
    cy.get(modalInsideSelector).should("be.visible");

    //text
    cy.get(modalInsideSelector).should(
      "include.text",
      "This site was thought to consume more pixels in vertical direction."
    );
    cy.get(modalInsideSelector).should(
      "include.text",
      "It needs that so badly, that looking at it, when window height is lower than expected, can injure your eye with painfully invisible content."
    );
  });

  it("show modal and have button hide", () => {
    //button
    cy.get(buttonSelector).should("be.visible").should("include.text", "hide");
  });

  it("should hide when button clicked", () => {
    //button
    cy.get(buttonSelector).click();
    cy.get(modalSelector).should("not.be.visible");
    cy.get(modalInsideSelector).should("not.be.visible");
  });
});

describe("modal not visible when height of browser window is all right on desktops", () => {
  beforeEach(() => {
    cy.viewport(1024, 721);
    cy.visit("http://localhost:3000");
  });

  it("should not show modal when height is ok", () => {
    cy.wait(2000);
    cy.get(modalSelector).should("not.exist");
    cy.get(modalInsideSelector).should("not.exist");
  });
});

describe("modal not visible when height of browser window is all right in mobiles", () => {
  beforeEach(() => {
    cy.viewport(500, 601);
    cy.visit("http://localhost:3000");
  });

  it("should not show modal when height is ok", () => {
    cy.wait(2000);
    cy.get(modalSelector).should("not.exist");
    cy.get(modalInsideSelector).should("not.exist");
  });
});

describe("modal should become visible when height of browser window changes to too small", () => {
  beforeEach(() => {
    cy.viewport(1024, 800);
    cy.visit("http://localhost:3000");
  });

  it("should show modal for desktops", () => {
    cy.viewport(1024, 719);
    cy.wait(2000);
    cy.get(modalSelector).should("be.visible");
    cy.get(modalInsideSelector).should("be.visible");
  });

  it("should show modal for mobiles", () => {
    cy.viewport(500, 599);
    cy.wait(2000);
    cy.get(modalSelector).should("be.visible");
    cy.get(modalInsideSelector).should("be.visible");
  });
});
