import { generateComment } from '../support/generateRandomUser';

describe('Comment', () => {
    it('Check Empty Comment', () => {
        cy.login();
        cy.visit('/');

        if (cy.findAllByTestId('single-post')) {
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-heading')
                .click();

            cy.findByTestId('comment-body')
                .findByTestId('create-comment-submit')
                .click();

            cy.contains('Cannot be empty').should('exist');
        }
    });

    it('Post Comment', () => {
        cy.login().then((user) => {
            cy.visit('/');

            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-heading')
                .click();

            cy.location().then((url) => {
                cy.post(url.pathname.split('/').at(-1) as string).then(
                    (post) => {
                        const randomComment = generateComment();

                        cy.findByTestId('create-comment-textarea').type(
                            randomComment.comment,
                        );

                        cy.findByTestId('comment-body')
                            .findByTestId('create-comment-submit')
                            .click();

                        cy.contains(`Discussion (${post.comments.length + 1})`);

                        cy.findAllByTestId('post-user-comments')
                            .its('length')
                            .should('eq', post.comments.length + 1);

                        cy.findAllByTestId('post-user-comments')
                            .children()
                            .contains(randomComment.comment);

                        cy.findAllByTestId('post-user-comments')
                            .children()
                            .contains(randomComment.comment)
                            .parent()
                            .contains(user.name);
                    },
                );
            });
        });
    });
});
