describe('Comment', () => {
    it('Check Empty Comment', () => {
        cy.login();
        cy.visit('/');

        if (cy.findAllByTestId('single-post')) {
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-heading')
                .click();

            cy.wait(200);
            cy.findByTestId('comment-body')
                .findByTestId('create-comment-submit')
                .click();

            cy.wait(200);

            cy.contains('Cannot be empty').should('exist');
        }
    });
});
