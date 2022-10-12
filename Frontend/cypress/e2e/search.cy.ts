describe('Search', () => {
    const searchTitle = 'sa';

    it('Search Bar', () => {
        cy.login();
        cy.visit('/');

        cy.findByTestId('desktop-header-search').type(`${searchTitle}{enter}`);

        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env(
                'searchUrl',
            )}?text=${searchTitle}`,
        );

        cy.searchPost(searchTitle).then((searchResult) => {
            if (searchResult.posts.length > 0) {
                cy.contains(`Search results for "${searchTitle}"`);

                cy.findAllByTestId('single-post')
                    .its('length')
                    .should('eq', searchResult.posts.length);

                cy.findAllByTestId('post-heading').should(
                    'contain',
                    searchTitle,
                );
            } else {
                cy.contains(`No post found for "${searchTitle}"`);

                cy.findAllByTestId('single-post').should('not.exist');
            }
        });
    });
});
