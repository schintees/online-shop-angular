declare namespace Cypress {
  interface Chainable<Subject = any> {
    clickOnIcon(iconType: string): typeof clickOnIcon;
    clickOnFirstTableRowtButton(): typeof clickOnFirstTableRowtButton;
    shouldOpenSnackBar(isError?: boolean): typeof shouldOpenSnackBar;
    login(
      username: string,
      password: string,
      shouldFail?: boolean
    ): typeof login;
    tableContainsElements(flag?: boolean): typeof tableContainsElements;
    urlContains(text: string): typeof urlContains;
    navigateToProductsPage(): typeof navigateToProductsPage;
    clickOnFirstProduct(): typeof clickOnFirstProduct;
  }
}

function clickOnFirstTableRowtButton(): void {
  cy.get('table').find('tr').eq(1).find('button').click();
}

function clickOnIcon(iconType: string): void {
  cy.get(`mat-icon[fontIcon=${iconType}]`).parent().click();
}

function shouldOpenSnackBar(isError: boolean = false): void {
  cy.get('mat-snack-bar-container')
    .should('be.visible')
    .should(
      'have.class',
      isError ? 'app-notification-error' : 'app-notification-success'
    );
}

function login(
  username: string,
  password: string,
  shouldFail: boolean = false
): void {
  cy.get('[formcontrolname="username"]').type(username);
  cy.get('[formcontrolname="password"]').type(password);

  cy.get('button[type=submit]')
    .click()
    .should(() => {
      shouldFail
        ? expect(localStorage.getItem('token')).to.be.null
        : expect(localStorage.getItem('token')).to.not.be.null;
    });
}

function tableContainsElements(flag: boolean = true): void {
  cy.get('tbody')
    .find('tr')
    .should(flag ? 'exist' : 'not.exist');
}

function urlContains(text: string): void {
  cy.url().should('include', text);
}

function navigateToProductsPage() {
  cy.urlContains('products');
  cy.wait('@loadProducts');
  cy.tableContainsElements();
}

function clickOnFirstProduct() {
  cy.clickOnFirstTableRowtButton();
  cy.wait('@getProduct');
  cy.urlContains('products/');
}

Cypress.Commands.add(
  'clickOnFirstTableRowtButton',
  clickOnFirstTableRowtButton
);
Cypress.Commands.add('clickOnIcon', clickOnIcon);
Cypress.Commands.add('shouldOpenSnackBar', shouldOpenSnackBar);
Cypress.Commands.add('login', login);
Cypress.Commands.add('tableContainsElements', tableContainsElements);
Cypress.Commands.add('urlContains', urlContains);
Cypress.Commands.add('navigateToProductsPage', navigateToProductsPage);
Cypress.Commands.add('clickOnFirstProduct', clickOnFirstProduct);
