describe('Comment Reply', () => {
    it.only('Empty Reply', () => {
        cy.login().then((user) => {
            cy.visit('/');

            if (cy.findAllByTestId('single-post')) {
                cy.findAllByTestId('single-post')
                    .first()
                    .findByTestId('post-heading')
                    .click();

                cy.location().then((url) => {
                    cy.post(url.pathname.split('/').at(-1) as string).then(
                        (post) => {
                            if (
                                post.comments.length > 0 &&
                                cy.findAllByTestId('post-user-comments')
                            ) {
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-reply')
                                    .click();

                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-reply-submit')
                                    .click();

                                cy.wait(200);

                                cy.contains('Cannot be empty').should('exist');
                            }
                        },
                    );
                });
            }
        });
    });
});
