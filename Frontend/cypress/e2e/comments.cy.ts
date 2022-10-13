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

    it('Comment Like', () => {
        cy.login().then((user) => {
            cy.visit('/');

            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-heading')
                .click();

            cy.location().then((url) => {
                cy.post(url.pathname.split('/').at(-1) as string).then(
                    (post) => {
                        if (post.comments.length === 0) {
                            const randomComment = generateComment();
                            cy.findByTestId('create-comment-textarea').type(
                                randomComment.comment,
                            );

                            cy.findByTestId('comment-body')
                                .findByTestId('create-comment-submit')
                                .click();
                        }

                        cy.findAllByTestId('post-user-comments')
                            .first()
                            .findByTestId('comment-like')
                            .click();

                        if (post.comments.length > 0) {
                            if (
                                post.comments[0].likes
                                    .map((like) => like._id === user._id)
                                    .filter(Boolean)
                                    .pop()
                            ) {
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-like')
                                    .should(
                                        'have.text',
                                        post.comments[0].likes.length - 1,
                                    );
                            } else {
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-like')
                                    .should(
                                        'have.text',
                                        post.comments[0].likes.length + 1,
                                    );
                            }
                        } else {
                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-like')
                                .should('have.text', 1);
                        }
                    },
                );
            });
        });
    });
});
