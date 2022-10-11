import { createPost } from '../support/generateRandomUser';

describe('Post section', () => {
    it('Post Unauthenticated UI', () => {
        cy.visit('/');
        cy.clearCookies();

        // click on post any
        if (cy.findAllByTestId('single-post')) {
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-heading')
                .click();

            cy.location().then((url) => {
                cy.post(url.pathname.split('/').at(-1) as string).then(
                    (post) => {
                        cy.url().should(
                            'eq',
                            `${Cypress.config().baseUrl}${Cypress.env(
                                'postUrlBackend',
                            )}/${url.pathname.split('/').at(-1)}`,
                        );

                        // image
                        if (post.image) {
                            cy.findByTestId('post-image')
                                .should('have.css', 'background-image')
                                .and('include', post.image.secure_url);
                        }

                        // check like
                        cy.findByTestId('like-button').should('exist');
                        cy.findByTestId('like-button').should(
                            'contain',
                            post.likes.length,
                        );
                        cy.findByTestId('unicorn-button').should('exist');
                        cy.findByTestId('unicorn-button').should(
                            'contain',
                            post.unicorns.length,
                        );
                        cy.findByTestId('bookmark-button').should('exist');
                        cy.findByTestId('bookmark-button').should(
                            'contain',
                            post.bookmarks.length,
                        );

                        // author
                        cy.checkAuthorPost();

                        // author name and link
                        cy.findByTestId('post-author-name').should(
                            'contain',
                            post.author.name,
                        );
                        cy.findByTestId('post-author-name').click();
                        cy.url().should(
                            'eq',
                            `${Cypress.config().baseUrl}${Cypress.env(
                                'userProfileUrl',
                            )}/${post.author.username}`,
                        );
                        cy.go('back');

                        // author image and link
                        cy.findByTestId('post-author-image').should(
                            'have.attr',
                            'src',
                            post.author.profile_photo.secure_url,
                        );

                        cy.findByTestId('post-heading').should('exist');
                        cy.findByTestId('post-heading').should(
                            'have.text',
                            post.title,
                        );

                        if (post.tags.length !== 0) {
                            cy.findByTestId('post-tags').should('exist');
                            post.tags.forEach((tag) =>
                                cy.contains(tag.name).should('exist'),
                            );
                        }
                        cy.findByTestId('post-content').should('exist');
                        cy.findByTestId('post-content').should(
                            'have.text',
                            post.description,
                        );

                        // check comment section
                        cy.contains(
                            `Discussion (${post.comments.length})`,
                        ).should('exist');
                        cy.findByTestId('comment-body').should('not.exist');

                        // check comments
                        if (
                            post.comments.length !== 0 &&
                            cy.findAllByTestId('post-user-comments')
                        ) {
                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-user-avatar')
                                .should('exist');
                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-user-name')
                                .should('exist');
                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-user-date')
                                .should('exist');
                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-user-body')
                                .should('exist');
                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-like')
                                .should('exist');
                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-reply')
                                .should('exist');

                            // reply textarea
                            cy.findAllByTestId('post-user-comments')
                                .first()
                                .findByTestId('comment-reply-textarea')
                                .should('not.exist');

                            post.comments.forEach((comment, index) => {
                                if (index < 5) {
                                    cy.findAllByTestId('post-user-comments')
                                        .contains(comment.author.name)
                                        .should('exist');
                                    cy.findAllByTestId('post-user-comments')
                                        .contains(comment.body)
                                        .should('exist');
                                }
                            });
                        }

                        // profile image
                        cy.findByTestId('post-author-side-image').should(
                            'exist',
                        );
                        cy.findByTestId('post-author-side-image').should(
                            'have.attr',
                            'src',
                            post.author.profile_photo.secure_url,
                        );
                        cy.findByTestId('post-author-side-image').click();
                        cy.url().should(
                            'eq',
                            `${Cypress.config().baseUrl}${Cypress.env(
                                'userProfileUrl',
                            )}/${post.author.username}`,
                        );
                        cy.go('back');

                        // profile name
                        cy.findByTestId('post-author-side-name').should(
                            'exist',
                        );
                        cy.findByTestId('post-author-side-name').should(
                            'contain',
                            post.author.name,
                        );

                        // profile bio
                        post.author.bio &&
                            cy
                                .findByTestId('post-author-side-bio')
                                .should('exist');

                        // location
                        post.author.location &&
                            cy
                                .findByTestId('post-author-side-location')
                                .should('exist');

                        // education
                        post.author.education &&
                            cy
                                .findByTestId('post-author-side-education')
                                .should('exist');

                        // education
                        post.author.work &&
                            cy
                                .findByTestId('post-author-side-work')
                                .should('exist');

                        cy.findByTestId('post-author-side-edit-profile').should(
                            'not.exist',
                        );
                        cy.findByTestId(
                            'post-author-side-follow-unfollow',
                        ).should('exist');
                        cy.findByTestId('post-author-side-joined').should(
                            'exist',
                        );
                    },
                );
            });
        }
    });

    it('Post Authenticated UI', () => {
        cy.login().then((user) => {
            cy.visit('/');

            // click on post any
            if (cy.findAllByTestId('single-post')) {
                cy.findAllByTestId('single-post')
                    .first()
                    .findByTestId('post-heading')
                    .click();

                cy.location().then((url) => {
                    cy.post(url.pathname.split('/').at(-1) as string).then(
                        (post) => {
                            cy.url().should(
                                'eq',
                                `${Cypress.config().baseUrl}${Cypress.env(
                                    'postUrlBackend',
                                )}/${url.pathname.split('/').at(-1)}`,
                            );

                            // image
                            if (post.image) {
                                cy.findByTestId('post-image')
                                    .should('have.css', 'background-image')
                                    .and('include', post.image.secure_url);
                            }

                            // comment section
                            cy.findByTestId('comment-body').should('exist');

                            cy.findByTestId('comment-body')
                                .findByTestId('create-comment-author-image')
                                .should('exist');
                            cy.findByTestId('comment-body')
                                .findByTestId('create-comment-author-image')
                                .children('img')
                                .should(
                                    'have.attr',
                                    'src',
                                    user.profile_photo.secure_url,
                                );
                            cy.findByTestId('comment-body')
                                .findByTestId('create-comment-author-image')
                                .click();
                            cy.url().should(
                                'eq',
                                `${Cypress.config().baseUrl}${Cypress.env(
                                    'userProfileUrl',
                                )}/${user.username}`,
                            );
                            cy.go('back');

                            cy.findByTestId('comment-body')
                                .findByTestId('create-comment-textarea')
                                .should('exist');

                            cy.findByTestId('comment-body')
                                .findByTestId('create-comment-submit')
                                .should('exist');

                            // check reply
                            if (
                                post.comments.length !== 0 &&
                                cy.findAllByTestId('post-user-comments')
                            ) {
                                // REPlY
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-reply')
                                    .click();

                                // reply textarea submit and cancel
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-reply-textarea')
                                    .should('exist');
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-reply-submit')
                                    .should('exist');
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-reply-dismiss')
                                    .should('exist');

                                // cancel reply
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-reply-dismiss')
                                    .click();
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-reply-textarea')
                                    .should('not.exist');
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-reply-submit')
                                    .should('not.exist');
                                cy.findAllByTestId('post-user-comments')
                                    .first()
                                    .findByTestId('comment-reply-dismiss')
                                    .should('not.exist');
                            }
                        },
                    );
                });
            }
        });
    });

    it('Profile Post UI', () => {
        cy.login().then((user) => {
            cy.visit(`${Cypress.env('userProfileUrl')}/${user.username}`);

            if (user.posts.length > 0) {
                // click post

                cy.findAllByTestId('single-post')
                    .first()
                    .findByTestId('post-heading')
                    .click();

                cy.location().then((url) => {
                    cy.post(url.pathname.split('/').at(-1) as string).then(
                        (post) => {
                            // image
                            if (post.image) {
                                cy.findByTestId('post-image')
                                    .should('have.css', 'background-image')
                                    .and('include', post.image.secure_url);
                            }

                            // edit post
                            cy.findByTestId('post-edit-button').should('exist');

                            cy.findByTestId('post-edit-button').click();
                            cy.url().should(
                                'eq',
                                `${Cypress.config().baseUrl}${
                                    url.pathname
                                }/edit`,
                            );
                            cy.go('back');
                            cy.wait(200);

                            // delete post
                            cy.findByTestId('post-delete-button').should(
                                'exist',
                            );

                            // modal should not exists
                            cy.findByTestId('post-delete-modal').should(
                                'not.exist',
                            );
                            // delete post modal
                            cy.findByTestId('post-delete-button').click();
                            cy.findByTestId('post-delete-modal').should(
                                'exist',
                            );
                            cy.findByTestId('post-delete-modal').contains(
                                'Confirm Deletion of Post?',
                            );
                            cy.findByTestId('post-delete-modal-close').should(
                                'exist',
                            );
                            cy.findByTestId('post-delete-modal-button').should(
                                'exist',
                            );

                            // close button
                            cy.findByTestId('post-delete-modal-close').click();
                            cy.findByTestId('post-delete-modal').should(
                                'not.exist',
                            );

                            // user profile
                            cy.findByTestId(
                                'post-author-side-edit-profile',
                            ).should('have.text', 'Edit Profile');
                        },
                    );
                });
            }
        });
    });

    it('Create Post UI', () => {
        cy.login();
        cy.visit(Cypress.env('createPostUrl'));

        // check header
        cy.contains('div', 'Create Post').should('exist');

        // check label  , input via label , and place holder
        cy.findAllByTestId('create-post-form').contains('label', 'Title');
        cy.findByLabelText('Title').should('exist');
        cy.findByPlaceholderText('Enter post title...').should('exist');

        cy.findAllByTestId('create-post-form').contains('label', 'Tags');
        cy.findByLabelText('Tags').should('exist');
        cy.findByPlaceholderText('Enter post title...').should('exist');

        cy.get('.post-image').should('exist');
        cy.findAllByTestId('create-post-form').contains(
            'label',
            'Choose a different photo',
        );
        cy.findByLabelText('Choose a different photo').should('exist');

        cy.findAllByTestId('post-content').should('exist');

        // buttons
        cy.findByTestId('create-post-button').should('exist');
    });

    it('Create Post Form ', () => {
        cy.login().then((user) => {
            cy.visit(Cypress.env('createPostUrl'));

            const newPost = createPost();

            cy.findByLabelText('Title').type(newPost.title);
            cy.findByLabelText('Tags').type(`${newPost.tag}{enter}`);
            cy.findAllByTestId('post-content', { timeout: 6000 }).type(
                newPost.description,
            );

            cy.findByTestId('create-post-button').click();

            cy.contains('Post Created!').should('exist');

            cy.url().should('eq', `${Cypress.config().baseUrl}/`);

            cy.findAllByTestId('single-post').should('contain', newPost.title);

            cy.visit(`${Cypress.env('userProfileUrl')}/${user.username}`);

            cy.findAllByTestId('single-post').should('contain', newPost.title);

            cy.findAllByTestId('post-heading').contains(newPost.title).click();

            cy.findByTestId('post-heading').should('have.text', newPost.title);

            cy.contains(newPost.tag).should('exist');

            cy.findByTestId('post-content').should(
                'have.text',
                newPost.description,
            );
        });
    });

    it('Check Empty Post Create Form', () => {
        cy.login();
        cy.visit(Cypress.env('createPostUrl'));

        cy.findByTestId('create-post-button').click();
        cy.wait(200);
        cy.contains('Fill All Details').should('exist');
    });

    it('Edit Post UI', () => {
        cy.login().then((user) => {
            cy.visit(`${Cypress.env('userProfileUrl')}/${user.username}`);

            if (user.posts.length !== 0) {
                // click post
                cy.findAllByTestId('single-post')
                    .first()
                    .findByTestId('post-heading')
                    .click();

                cy.location().then((url) => {
                    cy.post(url.pathname.split('/').at(-1) as string).then(
                        (post) => {
                            cy.findByTestId('post-edit-button').click();

                            // check url
                            cy.url().should(
                                'eq',
                                `${Cypress.config().baseUrl}${
                                    url.pathname
                                }/edit`,
                            );
                            cy.contains('Edit Post').should('exist');

                            //title check
                            cy.findAllByTestId('edit-post-form').contains(
                                'label',
                                'Title',
                            );
                            cy.findByLabelText('Title').should('exist');
                            cy.findByLabelText('Title').should(
                                'have.value',
                                post.title,
                            );

                            // check tags
                            cy.findAllByTestId('edit-post-form').contains(
                                'label',
                                'Tags',
                            );
                            cy.findByLabelText('Tags').should('exist');
                            post.tags.forEach((tag) => {
                                cy.contains(tag.name).should('exist');
                            });

                            // check post image
                            cy.get('.avatar-image').should('exist');
                            cy.findAllByTestId('edit-post-form').contains(
                                'label',
                                'Choose a different photo',
                            );
                            cy.findByLabelText(
                                'Choose a different photo',
                            ).should('exist');

                            // check image
                            if (post.image) {
                                cy.get('.avatar-image').should(
                                    'have.attr',
                                    'src',
                                    post.image.secure_url,
                                );
                            }

                            // content
                            cy.findByTestId('edit-post-form')
                                .findAllByTestId('post-content')
                                .should('exist');
                            cy.contains(post.description).should('exist');

                            // buttons
                            cy.findByTestId('edit-post-button').should('exist');
                            cy.findByTestId('cancel-button').should('exist');
                        },
                    );
                });
            }
        });
    });

    it('Edit Post Form', () => {
        cy.login().then((user) => {
            cy.visit(`${Cypress.env('userProfileUrl')}/${user.username}`);

            if (user.posts.length !== 0) {
                // click post
                cy.findAllByTestId('single-post')
                    .first()
                    .findByTestId('post-heading')
                    .click();

                cy.findByTestId('post-edit-button').click();

                const newPost = createPost();

                cy.findByLabelText('Title').clear().type(newPost.title);
                cy.findByLabelText('Tags').type(`${newPost.tag}{enter}`);
                cy.findAllByTestId('post-content', { timeout: 6000 }).type(
                    `{enter}${newPost.description}`,
                );

                cy.findByTestId('edit-post-button').click();

                cy.contains('Post Updated!').should('exist');

                cy.url().should('contain', `${Cypress.config().baseUrl}/post`);

                cy.visit(`${Cypress.config().baseUrl}`);

                cy.findAllByTestId('single-post').should(
                    'contain',
                    newPost.title,
                );

                cy.visit(`${Cypress.env('userProfileUrl')}/${user.username}`);

                cy.findAllByTestId('single-post').should(
                    'contain',
                    newPost.title,
                );

                cy.findAllByTestId('post-heading')
                    .contains(newPost.title)
                    .click();

                cy.findByTestId('post-heading').should(
                    'have.text',
                    newPost.title,
                );

                cy.contains(newPost.tag).should('exist');

                cy.findByTestId('post-content').should(
                    'contain',
                    newPost.description,
                );
            }
        });
    });
});
