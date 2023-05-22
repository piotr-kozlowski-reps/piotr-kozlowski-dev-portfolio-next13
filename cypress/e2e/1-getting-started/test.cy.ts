describe("test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("test1", () => {
    cy.get('[data-testid="test1"]').should("exist");
    cy.get('[data-testid="test1"] li').should("have.length", 0);
  });
});
