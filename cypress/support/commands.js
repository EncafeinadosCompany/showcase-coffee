Cypress.Commands.add('login', () => {
    cy.request('POST', 'http://localhost:3000/api/v1/auth', {
      email: 'admintienda@gmail.com',
      password: 'Admin123.'
    }).then((response) => {
    //   expect(response.status).to.eq(200);
      window.localStorage.setItem('token', response.body.token);
    });
  });
  