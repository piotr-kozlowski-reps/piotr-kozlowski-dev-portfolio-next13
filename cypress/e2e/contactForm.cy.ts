////vars
const contactFormSelector = '[data-testid="contact-form"]';
const contactGetInTOuchSelector = '[data-testid="contact-getintouch"]';
const contactNameFieldSelector = '[data-testid="contact-name-field"]';
const contactNameFieldErrorSelector = '[data-testid="contact-name-error"]';
const contactEmailSelector = '[data-testid="contact-email-field"]';
const contactEmailErrorSelector = '[data-testid="contact-email-error"]';
const contactMessageSelector = '[data-testid="contact-message-field"]';
const contactMessageErrorSelector = '[data-testid="contact-message-error"]';
const contactSendButtonSelector = '[data-testid="contact-send-button"]';
const modalButtonSelector = '[data-testid="modal-inside"] button';

////tests
describe("contact form section", () => {
  beforeEach(() => {
    cy.viewport(520, 500);
    cy.visit("http://localhost:3000");
    cy.get(contactFormSelector).scrollIntoView();
    cy.wait(400);
    cy.get(modalButtonSelector).click();
    cy.get(contactGetInTOuchSelector).scrollIntoView();
    cy.wait(100);
  });

  //helpers
  function clear() {
    cy.get(contactNameFieldSelector).clear();
    cy.get(contactEmailSelector).clear();
    cy.get(contactMessageSelector).clear();
  }

  //tests
  it("shows contact form section", () => {
    cy.get(contactFormSelector).should("exist");
    cy.get(contactFormSelector).should("be.visible");
  });

  it("checks if initially form has empty fields and send button is disabled", () => {
    cy.get(contactFormSelector).should("exist");
    cy.get(contactFormSelector).should("be.visible");

    cy.get(contactNameFieldSelector).should("exist");
    cy.get(contactNameFieldSelector).should("be.visible");
    cy.get(contactNameFieldSelector).should("have.value", "");

    cy.get(contactEmailSelector).should("exist");
    cy.get(contactEmailSelector).should("be.visible");
    cy.get(contactEmailSelector).should("have.value", "");

    cy.get(contactMessageSelector).should("exist");
    cy.get(contactMessageSelector).should("be.visible");
    cy.get(contactMessageSelector).should("have.value", "");

    cy.get(contactSendButtonSelector).should("exist");
    cy.get(contactSendButtonSelector).should("be.visible");
    cy.get(contactSendButtonSelector).should("be.disabled");
  });

  it("checks if name input works well: errors, happyPath", () => {
    cy.get(contactNameFieldSelector).should("have.value", "");
    cy.get(contactNameFieldSelector).type("Name");
    cy.get(contactNameFieldErrorSelector).should("not.exist");
    cy.get(contactNameFieldSelector).clear();
    cy.get(contactNameFieldErrorSelector).should("exist");
    cy.get(contactNameFieldErrorSelector).contains("Name is required.");
    cy.get(contactSendButtonSelector).should("be.disabled");
  });

  it("checks if email input works well: errors, happyPath", () => {
    const errorText = "The email provided has the wrong format.";

    cy.get(contactEmailSelector).should("have.value", "");
    cy.wait(100);

    cy.get(contactEmailSelector).type("whatever");
    cy.get(contactEmailErrorSelector).should("exist");
    cy.get(contactEmailErrorSelector).contains(errorText);
    cy.get(contactSendButtonSelector).should("be.disabled");

    cy.get(contactEmailSelector).clear();
    cy.get(contactEmailErrorSelector).should("exist");
    cy.get(contactEmailErrorSelector).contains(errorText);
    cy.get(contactSendButtonSelector).should("be.disabled");

    cy.get(contactEmailSelector).clear();
    cy.get(contactEmailSelector).clear();
    cy.get(contactEmailSelector).type("whatever@dfbsdg");
    cy.get(contactEmailErrorSelector).should("exist");
    cy.get(contactEmailErrorSelector).contains(errorText);
    cy.get(contactSendButtonSelector).should("be.disabled");

    cy.get(contactEmailSelector).clear();
    cy.get(contactEmailSelector).type("@dfbsdg.pl");
    cy.get(contactEmailErrorSelector).should("exist");
    cy.get(contactEmailErrorSelector).contains(errorText);
    cy.get(contactSendButtonSelector).should("be.disabled");

    cy.get(contactEmailSelector).clear();
    cy.get(contactEmailSelector).type("sdfvsd@dfbsdg.pl");
    cy.get(contactEmailErrorSelector).should("not.exist");
    cy.get(contactSendButtonSelector).should("be.disabled");
  });

  it("checks if message input works well: errors, happyPath", () => {
    cy.get(contactMessageSelector).should("have.value", "");

    cy.get(contactMessageSelector).type("Example message.");
    cy.get(contactMessageErrorSelector).should("not.exist");

    cy.get(contactMessageSelector).clear();
    cy.get(contactMessageErrorSelector).should("exist");

    cy.get(contactSendButtonSelector).should("be.disabled");
  });

  it("should show SEND button disabled in this situations", () => {
    cy.get(contactSendButtonSelector).should("be.disabled");

    cy.get(contactNameFieldSelector).type("Name");
    cy.get(contactEmailSelector).type("sdfvsd@dfbsdg.pl");
    cy.get(contactSendButtonSelector).should("be.disabled");

    clear();
    cy.get(contactNameFieldSelector).type("Name");
    cy.get(contactMessageSelector).type("Example message.");
    cy.get(contactSendButtonSelector).should("be.disabled");

    clear();
    cy.get(contactEmailSelector).type("sdfvsd@dfbsdg.pl");
    cy.get(contactMessageSelector).type("Example message.");
    cy.get(contactSendButtonSelector).should("be.disabled");
  });

  it("should show SEND button enabled when all fields are filled properly", () => {
    cy.get(contactSendButtonSelector).should("be.disabled");

    cy.get(contactNameFieldSelector).type("Name");
    cy.get(contactEmailSelector).type("sdfvsd@dfbsdg.pl");
    cy.get(contactMessageSelector).type("Example message.");
    cy.get(contactSendButtonSelector).should("be.enabled");
  });
});

export {};
