import { generateComment } from '../support/generateRandomUser';

describe('Comment Reply', () => {
    it('Empty Reply', () => {
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

                                cy.contains('Cannot be empty').should('exist');
                            }
                        },
                    );
                });
            }
        });
    });

    it('Reply', () => {
        cy.login().then((user) => {
            cy.visit('/');

            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-heading')
                .click();

            cy.location().then((url) => {
                cy.post(url.pathname.split('/').at(-1) as string).then(
                    (post) => {
                        const randomReply = generateComment();

                        if (
                            post.comments.length > 0 &&
                            cy.findAllByTestId('post-user-comments')
                        ) {
                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-reply')
                                .click();

                            cy.findByTestId('comment-reply-textarea').type(
                                randomReply.comment,
                            );

                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-reply-submit')
                                .click();

                            cy.contains(
                                `Discussion (${post.comments.length + 1})`,
                            );

                            cy.findAllByTestId('post-user-comments')
                                .its('length')
                                .should('eq', post.comments.length + 1);

                            cy.findAllByTestId('post-user-comments')
                                .children()
                                .contains(randomReply.comment);

                            cy.findAllByTestId('post-user-comments')
                                .children()
                                .contains(randomReply.comment)
                                .parent()
                                .contains(user.name);
                        } else {
                            const randomComment = generateComment();

                            cy.findByTestId('create-comment-textarea').type(
                                randomComment.comment,
                            );

                            cy.findByTestId('comment-body')
                                .findByTestId('create-comment-submit')
                                .click();

                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-reply')
                                .click();

                            cy.findByTestId('comment-reply-textarea').type(
                                randomReply.comment,
                            );

                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-reply-submit')
                                .click();

                            cy.contains(
                                `Discussion (${post.comments.length + 2})`,
                            );

                            cy.findAllByTestId('post-user-comments')
                                .its('length')
                                .should('eq', post.comments.length + 2);

                            cy.findAllByTestId('post-user-comments')
                                .children()
                                .contains(randomReply.comment);

                            cy.findAllByTestId('post-user-comments')
                                .children()
                                .contains(randomReply.comment)
                                .parent()
                                .contains(user.name);
                        }
                    },
                );
            });
        });
    });
});
