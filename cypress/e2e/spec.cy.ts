import '../support/commands'

describe('Login Test', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/products').as('loadProducts');
    cy.intercept('GET', '**/products/**').as('getProduct');
    cy.intercept('POST', '**/products').as('createProduct');
    cy.intercept('POST', '**/orders').as('createOrder');
    cy.visit('/');
  });

  it('should create order', () => {
    // user redirected to login page
    cy.urlContains('login');

    // fill the credentials
    cy.login('doej', 'password');

    // navigate to products page
    cy.navigateToProductsPage()

    // click on product
    cy.clickOnFirstProduct();

    // add product to the shopping cart
    cy.clickOnIcon('add_shopping_cart');
    cy.shouldOpenSnackBar();

    // navigate to the shopping cart page
    cy.go('back');
    cy.tableContainsElements()
    cy.clickOnIcon('shopping_cart');

    // create order
    cy.get('.header-actions').find('button').click();
    cy.wait('@createOrder');
    cy.shouldOpenSnackBar();
    cy.tableContainsElements(false);
  })

  it('should create product', () => {
    // user redirected to login page
    cy.urlContains('login');

    // fill the credentials
    cy.login('blackj', '12345678');

    // navigate to products page
    cy.navigateToProductsPage()

    // navigate to create product page
    cy.clickOnIcon('add');

    // fill the form
    cy.get('[formcontrolname="name"]').type("product_name");
    cy.get('[formcontrolname="category"]').type("product_category");
    cy.get('[formcontrolname="image"]').type("product_image");
    cy.get('[formcontrolname="price"]').type("123");
    cy.get('[formcontrolname="description"]').type("product_description");

    // create the product
    cy.get('button[type=submit]').click();
    cy.wait('@createProduct');
    cy.shouldOpenSnackBar();
    cy.urlContains('products');
  })

  it('should delete product', () => {
    // user redirected to login page
    cy.urlContains('login');

    // fill the credentials
    cy.login('blackj', '12345678');

    // navigate to products page
    cy.navigateToProductsPage();

    // click on product
    cy.clickOnFirstProduct();

    // click on delete button
    cy.clickOnIcon('delete');

    cy.get('[mat-dialog-actions]').find('button').eq(1).click();
    cy.shouldOpenSnackBar();
  })

  it('should fail the login', () => {
    cy.login('wrong', 'wrong', true);

    cy.urlContains('login')
    cy.shouldOpenSnackBar(true);
  })

})
