const aboutSectionSelector = "[data-testid='about-overall']";
const aboutLogoSectionSelector = "[data-testid='about-overall-logo']";
const aboutLogoDeveloperSectionSelector =
  "[data-testid='about-overall-logo-developer']";
const aboutLogoDesignerSectionSelector =
  "[data-testid='about-overall-logo-designer']";
const aboutTextSectionSelector = "[data-testid='about-overall-text']";
const aboutTextDeveloperSelector =
  "[data-testid='about-overall-text-developer']";

describe("about section", () => {
  beforeEach(() => {
    cy.viewport(450, 700);
    cy.visit("http://localhost:3000");
  });

  it("shows logotype", () => {
    cy.get(aboutSectionSelector).should("exist");
    cy.get(aboutTextSectionSelector).scrollIntoView();

    cy.get(aboutLogoSectionSelector)
      .should("exist")
      .should(
        "have.attr",
        "src",
        "/_next/image?url=%2Flogo_only_graph_transparency.png&w=256&q=75"
      );

    cy.get(aboutLogoDeveloperSectionSelector)
      .should("exist")
      .should(
        "have.attr",
        "src",
        "/_next/image?url=%2Flogo_only_graph_transparency__developer.png&w=256&q=75"
      );

    cy.get(aboutLogoDesignerSectionSelector)
      .should("exist")
      .should(
        "have.attr",
        "src",
        "/_next/image?url=%2Flogo_only_graph_transparency__designer.png&w=256&q=75"
      );
  });

  it("shows overall text", () => {
    cy.get(aboutSectionSelector).should("exist");
    cy.get(aboutTextSectionSelector)
      .scrollIntoView()
      .should(
        "include.text",
        "Here comes text that is never read by anyone, ever. Main keywords I wish to emphasize are: front-end, developer and reliable."
      )
      .should(
        "include.text",
        `Another never read part, with keywords: designer, reliable ("reliable" is still visible on screen above, so it seems redundant!). Have you noticed visual connection with parallel appearing "designer" logo part? Appealing? (I'm not convinced, ...reconsider!)`
      );
  });

  it("shows developer text", () => {
    cy.get(aboutTextDeveloperSelector)
      .first()
      .scrollIntoView()
      .should(
        "include.text",
        "developer \n                    I'm /\n                    I wish I could be\n                    \n                      \n                      (delete as appropriate)\n                    \n                    a front-end developer.\n                  \n                  \n                    I really like this. It's annoying and relaxing in the same\n                    moment, since when you do it (finally) in a right manner -\n                    it works (that certainty is not so common elsewhere).\n                  \n                  \n                  \n                    * And yes... I also do this for money.\n                  html / cssTailwindJAVASCRIPT / TYPESCRIPT FRAMEWORKSReact | Next | ExpressNODEJAVA"
      );
  });

  it("shows designer text", () => {
    cy.get(aboutTextDeveloperSelector)
      .last()
      .scrollIntoView()
      .should(
        "include.text",
        `designer\n                    That's what I've been doing for living for past few years. A\n                    graphic designer for almost every dimension, but 3rd\n                    dimension suits me most.\n                  \n                  \n                    However "most" doesn't mean entirely, I have knowledge of\n                    majority* of graphic programs that are widely used.\n                  \n                  \n                    * Even Midjourney, that makes me redundant in some\n                    areas ('winter is coming ...')\n                  3d graphics3D Studio MAX | Corona | VrayrasterPhotoshop | Figma | LightRoomvideoPremiere | AfterEffects | Resolve`
      );
  });
});
