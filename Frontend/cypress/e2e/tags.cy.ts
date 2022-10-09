describe('Tags', () => {
    it('Check All Tags', () => {
        cy.visit(Cypress.env('tagsUrl'));

        cy.tags().then((body) => {
            if (body.tags.length !== 0) {
                cy.findAllByTestId('tag-container').should(
                    'have.length',
                    body.tags.length,
                );

                body.tags.forEach((tag, index) => {
                    if (index < 5) {
                        cy.contains(tag.name).should('exist');
                        tag.posts.length > 0 &&
                            cy
                                .contains(`${tag.posts.length} posts published`)
                                .should('exist');

                        cy.contains('a', `#${tag.name}`).click();
                        cy.url().should(
                            'eq',
                            `${Cypress.config().baseUrl}${Cypress.env(
                                'singleTagsUrl',
                            )}/${tag.name}`,
                        );
                        cy.go('back');
                    }
                });
            } else {
                cy.findAllByTestId('tag-container').should('not.exist');
            }
        });
    });

    it('Check Single Tag', () => {
        cy.tags().then((body) => {
            if (body.tags.length > 0) {
                // iterate thorugh all array
                body.tags.forEach((tag, index) => {
                    // check index less than 5
                    tag.name &&
                        index < 5 &&
                        cy.visit(`${Cypress.env('singleTagsUrl')}/${tag.name}`);

                    // check index less than 5
                    tag.name &&
                        index < 5 &&
                        // check single tag
                        cy.singleTag(tag.name).then((tag) => {
                            // check name
                            cy.findByTestId('tag-name').contains(tag.name);

                            // check post length
                            tag.posts.length > 0 &&
                                cy
                                    .findAllByTestId('tags-post-list')
                                    .children()
                                    .should('have.length', tag.posts.length);

                            // check post content
                            tag.posts.length > 0 &&
                                tag.posts.forEach((post) => {
                                    cy.contains(post.title);
                                });
                        });
                });
            } else {
                cy.contains(`Tag Not Found`).should('exist');
            }
        });
    });
});
