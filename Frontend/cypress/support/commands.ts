declare namespace Cypress {
    interface Chainable {
        checkLogo(): void;
        oauthCheckText(): void;
        login(): Cypress.Chainable<{
            name: string;
            email: string;
            username: string;
            user_id: string;
            social_id: string;
            profile_photo: {
                id: string;
                secure_url: string;
            };
            role: string;
            bio: string;
            portfolio_link: string;
            work: string;
            skills: string;
            education: string;
            location: string;
            githubUrl: string;
            twitterUrl: string;
            total_followers: number;
            total_following: number;
            following: [];
            followers: [];
            bookmarks: [];
            posts: [];
            tags: [];
            comments: [];
            createdAt: string;
            _id: string;
        }>;
        checkLoaderRemoved(): void;
        checkAuthorPost(): void;
        post(postId: string): Cypress.Chainable<{
            author: {
                name: string;
                profile_photo: {
                    id: string;
                    secure_url: string;
                };
                username: string;
                _id: string;
                bio: string;
                education: string;
                createdAt: string;
                location: string;
                user_id: string;
                work: string;
            };
            bookmarks: Array<string>;
            comments: Array<{
                body: string;
                author: {
                    profile_photo: {
                        id: string;
                        secure_url: string;
                    };
                    _id: string;
                    name: string;
                    username: string;
                    user_id: string;
                };
                post: string;
                likes: Array<{
                    profile_photo: {
                        id: string;
                        secure_url: string;
                    };
                    _id: string;
                    name: string;
                    username: string;
                    user_id: string;
                }>;
                _id: string;
                comment_id: string;
                createdAt: string;
                parent_comment: string;
            }>;
            createdAt: string;
            description: string;
            image: {
                id: string;
                secure_url: string;
            };
            likes: Array<string>;
            post_id: string;
            tags: Array<{
                name: string;
                _id: string;
            }>;
            title: string;
            unicorns: string[];
            _id: string;
        }>;
        tags(): Cypress.Chainable<{
            tags: {
                createdAt: string;
                followers: string[];
                name: string;
                posts: string[];
                tag_id: string;
                _id: string;
            }[];
        }>;
        singleTag(tag_id: string): Cypress.Chainable<{
            createdAt: string;
            followers: string[];
            name: string;
            posts: {
                author: {
                    profile_photo: {
                        id: string;
                        secure_url: string;
                    };
                    _id: string;
                    name: string;
                    username: string;
                };
                bookmarks: [];
                comments: [];
                createdAt: string;
                description: string;
                image: {
                    id: string;
                    secure_url: string;
                };
                likes: [];
                post_id: string;
                tags: Array<{
                    name: string;
                    _id: string;
                }>;
                title: string;
                unicorns: [];
                _id: string;
            }[];
            tag_id: string;
            _id: string;
        }>;
        searchPost(postTitleName: string): Cypress.Chainable<{
            posts: Array<{
                author: {
                    profile_photo: {
                        id: string;
                        secure_url: string;
                    };
                    _id: string;
                    name: string;
                    username: string;
                };
                bookmarks: [];
                comments: Array<{
                    body: string;
                    author: {
                        profile_photo: {
                            id: string;
                            secure_url: string;
                        };
                        _id: string;
                        name: string;
                        username: string;
                        user_id: string;
                    };
                    post: string;
                    likes: Array<{
                        profile_photo: {
                            id: string;
                            secure_url: string;
                        };
                        _id: string;
                        name: string;
                        username: string;
                        user_id: string;
                    }>;
                    _id: string;
                    comment_id: string;
                    createdAt: string;
                    parent_comment: string;
                }>;
                createdAt: string;
                description: string;
                image: {
                    id: string;
                    secure_url: string;
                };
                likes: [];
                post_id: string;
                tags: Array<string>;
                title: string;
                unicorns: [];
                _id: string;
            }>;
        }>;
    }
}

Cypress.Commands.add('checkLogo', () => {
    cy.findByTestId('header').findByTestId('home-logo').should('exist');
});

Cypress.Commands.add('oauthCheckText', () => {
    cy.contains('Welcome to Coder Social Community').should('exist');
    cy.contains('Continue with Google').should('exist');
    cy.contains('Continue with Github').should('exist');
    cy.contains('Continue with Twitter').should('exist');
});

Cypress.Commands.add('login', () => {
    cy.request({
        url: `${Cypress.env('apiUrl')}${Cypress.env('loginUrlBackend')}`,
        method: 'POST',
        body: {
            email: Cypress.env('userEmail'),
            password: Cypress.env('userPassword'),
        },
    }).then((response) => ({
        ...response.body.user,
    }));
});

Cypress.Commands.add('checkLoaderRemoved', () => {
    cy.findByTestId('loader-main', { timeout: 1000 }).should('not.exist');
});

Cypress.Commands.add('checkAuthorPost', () => {
    cy.findByTestId('post-author-image').should('exist');
    cy.findByTestId('post-author-date').should('exist');
    cy.findByTestId('post-author-name').should('exist');
});

Cypress.Commands.add('post', (postId) => {
    cy.request({
        url: `${Cypress.env('apiUrl')}${Cypress.env(
            'postUrlBackend',
        )}/${postId}`,
        method: 'GET',
    }).then((response) => ({
        ...response.body.post,
    }));
});

Cypress.Commands.add('tags', () => {
    cy.request({
        url: `${Cypress.env('apiUrl')}${Cypress.env('tagsUrlBackend')}`,
        method: 'GET',
    }).then((response) => ({
        ...response.body,
    }));
});

Cypress.Commands.add('singleTag', (tag_id) => {
    cy.request({
        url: `${Cypress.env('apiUrl')}/${Cypress.env(
            'singleTagUrlBackend',
        )}/${tag_id}`,
        method: 'GET',
    }).then((response) => ({
        ...response.body.tag,
    }));
});

Cypress.Commands.add('searchPost', (postTitleName) => {
    cy.request({
        url: `${Cypress.env('apiUrl')}${Cypress.env(
            'searchUrlBackend',
        )}${postTitleName}`,
        method: 'GET',
    }).then((response) => ({
        ...response.body,
    }));
});
