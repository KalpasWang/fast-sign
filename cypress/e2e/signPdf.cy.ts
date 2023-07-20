describe('fast-sign with pdf file', () => {
  it('should sign a pdf file', () => {
    cy.visit('http://localhost:3000');
    cy.wait(1000);
    cy.get('input[type=file]').selectFile('test.pdf');
    cy.wait(5000);

    // canvas 應顯示 pdf 第一頁
    cy.get('#canvas').should('be.visible');
    cy.get('button#prev-page').should('be.disabled');
    cy.get('button#next-page').should('be.enabled');
    cy.get('#page-number').should('have.text', '1 / 2');
    // cy.get('#canvas').first().screenshot();

    cy.get('button#next-page').click();
    // cy.get('#canvas').first().screenshot();

    // 產生簽名檔
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
    cy.get('button#save-signature').click();
    cy.get('img#signature-preview1')
      .should('be.visible')
      .and('have.attr', 'draggable');

    // 拖移簽名檔到 pdf canvas
    cy.get('img#signature-preview1').trigger('dragstart', 'topLeft');
    cy.get('img#signature-preview1').trigger('mousedown', 'topLeft');
    cy.window().should('have.property', 'draggedImage');
    cy.get('img#signature-preview1').trigger('mousemove', {
      clientX: -400,
      clientY: 0,
    });
    cy.get('img#signature-preview1').trigger('mouseup');
    // cy.get('img#signature-preview1').trigger('drop', {
    //   screenX: 0,
    //   screenY: 0,
    // });

    cy.get('canvas.upper-canvas').trigger('drop', {
      force: true,
    });
    cy.wait(1000);
    cy.get('canvas.upper-canvas')
      .trigger('mousemove', 'topLeft')
      .should('have.css', 'cursor', 'move');
  });
});
