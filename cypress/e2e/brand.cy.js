describe('template spec', () => {

  beforeEach(() => {

    cy.login() 
    cy.visit('/brands')
  
      
    cy.intercept('GET', 'http://localhost:3000/api/v1/products/brands')
    .as('getBrands');
    
   
    cy.intercept('GET', 'http://localhost:3000/api/v1/products/brands/socialNetworks')
    .as('fetchSocialNetworks');
    
   
    cy.intercept('POST', 'http://localhost:3000/api/v1/products/brands')
    .as('addBrand');
    
  });


  it('Debe cargar la lista de marcas correctamente', () => {

    cy.wait('@getBrands').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304]);
      expect(interception.response.body).to.exist;
    });
  
  })

  it('Debe agregar una nueva marca', () => {

  // ✅ GIVEN: El usuario está en la página de marcas

    cy.get('[data-cy=add-brand-button]').click();
    cy.url().should('include', '/form-brands');

  // ✅ WHEN: El usuario llena el formulario de creación de marca
   
    cy.get('[data-cy=brand-name]').type('Nueva Marca');
    cy.get('[data-cy=next-button]').click();

    cy.get('[data-cy=brand-purpose]').type('Propósito de prueba');
    cy.get('[data-cy=brand-description]').type('Descripción de prueba');
    cy.get('[data-cy=next-button]').click();


   // Listar redes sociales
    cy.wait('@fetchSocialNetworks').then((interception) => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304]);
        expect(interception.response.body).to.exist;
    });
  
     
  //✅ Agregar redes sociales
    cy.get('[data-cy=add-network]').click();
    cy.get('[data-cy=select-network]').click();
    cy.get('[data-cy=option-instagram]').click(); ;
    cy.get('[data-cy=social-network-type]').type('Prueba@instagram');
    cy.get('[data-cy=social-network-description]').type('Nuestro instagram');
    cy.get('[data-cy=submit-button]').click();

  // ✅ THEN: La marca se agrega correctamente

    cy.wait('@addBrand').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
      expect(interception.response.body.name).to.eq('Nueva Marca');
    });

    // cy.url().should('include', '/brands');
    // cy.get('[data-cy=brand-list]').should('contain', 'Nueva Marca');
  });



})





