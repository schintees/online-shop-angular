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
    cy.url().should('include', 'login');

    // fill the credentials
    cy.get('[formcontrolname="username"]').type('doej');
    cy.get('[formcontrolname="password"]').type('password');

    cy.get('button[type=submit]').click().should(() => {
      expect(localStorage.getItem('token')).to.not.be.null;
    });

    // navigate to products page
    cy.url().should('include', 'products');
    cy.wait('@loadProducts');
    cy.get('tbody').find('tr').should('exist');

    // click on product
    cy.get('table').find('tr').eq(1).find('button').click();
    cy.wait('@getProduct')
    cy.url().should('include', 'products/');

    // add product to the shopping cart
    cy.get('mat-icon').should('be.visible').should('have.text', 'add_shopping_cart')
      .parent().click();
    cy.get('mat-snack-bar-container').should('be.visible').should('have.class', 'app-notification-success');

    // navigate to the shopping cart page
    cy.go('back');
    cy.get('tbody').find('tr').should('exist');
    cy.get('mat-icon').filter(':contains("shopping_cart")').parent().click();

    // create order
    cy.get('.header-actions').find('button').click();
    cy.wait('@createOrder');
    cy.get('mat-snack-bar-container').should('be.visible').should('have.class', 'app-notification-success');
    cy.get('tbody').find('tr').should('not.exist');
  })

  it('should create product', () => {
    // user redirected to login page
    cy.url().should('include', 'login');

    // fill the credentials
    cy.get('[formcontrolname="username"]').type('blackj');
    cy.get('[formcontrolname="password"]').type('12345678');

    cy.get('button[type=submit]').click().should(() => {
      expect(localStorage.getItem('token')).to.not.be.null;
    });

    // navigate to products page
    cy.url().should('include', 'products');
    cy.wait('@loadProducts');
    cy.get('tbody').find('tr').should('exist');

    // navigate to create product page
    cy.get('mat-icon').filter(':contains("add")').parent().click();

    // fill the form
    cy.get('[formcontrolname="name"]').type("product_name");
    cy.get('[formcontrolname="category"]').type("product_category");
    cy.get('[formcontrolname="image"]').type("product_image");
    cy.get('[formcontrolname="price"]').type("123");
    cy.get('[formcontrolname="description"]').type("product_description");

    // create the product
    cy.get('button[type=submit]').click();
    cy.wait('@createProduct');
    cy.get('mat-snack-bar-container').should('be.visible').should('have.class', 'app-notification-success');
    cy.url().should('include', 'products');
  })

  it('should delete product', () => {
    // user redirected to login page
    cy.url().should('include', 'login');

    // fill the credentials
    cy.get('[formcontrolname="username"]').type('blackj');
    cy.get('[formcontrolname="password"]').type('12345678');

    cy.get('button[type=submit]').click().should(() => {
      expect(localStorage.getItem('token')).to.not.be.null;
    });

    // navigate to products page
    cy.url().should('include', 'products');
    cy.wait('@loadProducts');
    cy.get('tbody').find('tr').should('exist');

    // click on product
    cy.get('table').find('tr').eq(1).find('button').click();
    cy.wait('@getProduct')
    cy.url().should('include', 'products/');

    // click on delete button
    cy.get('mat-icon').filter(':contains("delete")').parent().click();
    cy.get('[mat-dialog-actions]').find('button').eq(1).click();
    cy.get('mat-snack-bar-container').should('be.visible').should('have.class', 'app-notification-success');
  })

  it('should fail the login', () => {
    cy.get('[formcontrolname="username"]').type('wrong');
    cy.get('[formcontrolname="password"]').type('wrong');

    cy.get('button[type=submit]').click().should(() => {
      expect(localStorage.getItem('token')).to.be.null;
    });
    cy.url().should('include', 'login')
    cy.get('mat-snack-bar-container').should('be.visible').should('have.class', 'app-notification-error');
  })

})
