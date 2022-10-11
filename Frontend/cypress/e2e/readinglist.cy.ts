describe('Reading List', () => {
    it('Check Reading List', () => {
        cy.login().then((user) => {
            cy.visit(`${Cypress.env('readingListUrl')}`);

            if (user.bookmarks.length === 0) {
                cy.contains('Reading List is empty!').should('exist');
            } else {
                cy.contains('Reading List is empty!').should('not.exist');
                cy.contains(`Reading List (${user.bookmarks.length})`).should(
                    'exist',
                );

                cy.findAllByTestId('reading-list-list')
                    .children()
                    .should('have.length', user.bookmarks.length);
            }
        });
    });
});
