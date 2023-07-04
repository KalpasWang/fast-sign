describe('fast-sign with pdf file', () => {
  it('should sign a pdf file', () => {
    cy.visit('http://localhost:3000');
    cy.wait(1000);
    cy.get('input[type=file]').selectFile('test.pdf');
    cy.wait(5000);

    // 驗證
    cy.get('#canvas').should('be.visible');
    cy.get('button#prev-page').should('be.disabled');
    cy.get('button#next-page').should('be.enabled');
    cy.get('#page-number').should('have.text', '1 / 2');
    // cy.get('#canvas').first().screenshot();

    cy.get('button#next-page').click();
    // cy.get('#canvas').first().screenshot();

    cy.get('button#create-signature').click();
    cy.get('canvas#sign-canvas').should('be.visible');
    cy.get('canvas.upper-canvas')
      .last()
      .trigger('mousedown', 'bottom')
      .trigger('mousemove', 'top')
      .trigger('mouseup')
      .trigger('mousedown', 'left')
      .trigger('mousemove', 'right')
      .trigger('mouseup');
  });
});
