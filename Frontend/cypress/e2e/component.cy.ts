describe('Component', () => {
    it('Post Component', () => {
        cy.visit('/');
        cy.clearCookies();

        if (cy.findAllByTestId('single-post')) {
            // image with link
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-author-image')
                .should('exist');
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-author-image')
                .click();
            cy.url().should(
                'contain',
                `${Cypress.config().baseUrl}${Cypress.env('userProfileUrl')}`,
            );
            cy.go('back');

            // name with link
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-author-name')
                .should('exist');
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-author-name')
                .click();
            cy.url().should(
                'contain',
                `${Cypress.config().baseUrl}${Cypress.env('userProfileUrl')}`,
            );
            cy.go('back');

            // date
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-author-date')
                .should('exist');

            // heading and link
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-heading')
                .should('exist');
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-heading')
                .click();
            cy.url().should(
                'contain',
                `${Cypress.config().baseUrl}${Cypress.env('postUrl')}`,
            );
            cy.go('back');

            // tags
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-tags')
                .should('exist');

            // like
            cy.findAllByTestId('single-post')
                .first()
                .contains('reactions')
                .should('exist');
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-like')
                .should('exist');
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-like')
                .click();
            cy.url().should(
                'contain',
                `${Cypress.config().baseUrl}${Cypress.env('postUrl')}`,
            );
            cy.go('back');

            // comment
            cy.findAllByTestId('single-post')
                .first()
                .contains('comments')
                .should('exist');
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-comment')
                .should('exist');
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-comment')
                .click();
            cy.url().should(
                'contain',
                `${Cypress.config().baseUrl}${Cypress.env('postUrl')}`,
            );
            cy.go('back');

            // text
            cy.findAllByTestId('single-post')
                .first()
                .findByTestId('post-bookmark')
                .should('exist');
            cy.findAllByTestId('single-post')
                .first()
                .contains('Save')
                .should('exist');
        }
    });

    it('Navbar unauthenticated', () => {
        cy.visit('/');
        cy.clearCookies();

        // check logo and link
        cy.checkLogo();
        cy.findByTestId('header').findByTestId('home-logo').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        // check search
        cy.findByTestId('header')
            .findAllByTestId('desktop-header-search')
            .should('exist');
        cy.findByTestId('header')
            .findAllByPlaceholderText('Search.....')
            .should('exist');

        // check login and link
        cy.findByTestId('header').contains('a', 'Create Account');
        cy.findByTestId('sign-up-button-header').should('exist');
        cy.findByTestId('sign-up-button-header').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('signupUrl')}`,
        );
        cy.go('back');

        // check create account and link
        cy.findByTestId('header').contains('a', 'Log in');
        cy.findByTestId('log-in-button-header').should('exist');
        cy.findByTestId('log-in-button-header').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('loginUrl')}`,
        );
        cy.go('back');

        // not exits
        cy.findByTestId('profile-button').should('not.exist');
        cy.contains('a', 'Create Post').should('not.exist');
        cy.findByTestId('notification-icon').should('not.exist');
        cy.findByTestId('profile-wrapper').should('not.exist');
        cy.findByTestId('navbar-black-area').should('not.exist');
    });

    it('Navbar authenticated', () => {
        cy.login().then((user) => {
            cy.visit('/');

            // check logo
            cy.checkLogo();
            cy.findByTestId('header').findByTestId('home-logo').click();
            cy.url().should('eq', `${Cypress.config().baseUrl}/`);

            // check search
            cy.findByTestId('header')
                .findAllByTestId('desktop-header-search')
                .should('exist');
            cy.findByTestId('header')
                .findAllByPlaceholderText('Search.....')
                .should('exist');

            // create post and link
            cy.contains('a', 'Create Post').should('exist');
            cy.contains('a', 'Create Post').click();
            cy.url().should(
                'eq',
                `${Cypress.config().baseUrl}${Cypress.env('createPostUrl')}`,
            );
            cy.go('back');

            // notification and link
            cy.findByTestId('notification-icon').should('exist');
            cy.findByTestId('notification-icon').click();
            cy.url().should(
                'eq',
                `${Cypress.config().baseUrl}${Cypress.env('notificationUrl')}`,
            );
            cy.go('back');

            // profile
            cy.findByTestId('profile-button').should('exist');

            // profile wrapper
            cy.findByTestId('profile-wrapper').should('not.exist');
            cy.findByTestId('navbar-black-area').should('not.exist');
            cy.findByTestId('profile-button').click();
            cy.findByTestId('profile-wrapper').should('exist');

            // profile and link
            cy.findByTestId('profile-wrapper')
                .contains('View Profile')
                .should('exist');
            cy.findByTestId('profile-wrapper')
                .contains(`@${user.username}`)
                .should('exist');
            cy.findByTestId('profile-wrapper').contains('View Profile').click();
            cy.url().should(
                'contain',
                `${Cypress.config().baseUrl}${Cypress.env('userProfileUrl')}`,
            );
            cy.go('back');
            cy.findByTestId('profile-button').click();

            // edit profile and link
            cy.findByTestId('profile-wrapper')
                .contains('Edit Profile')
                .should('exist');
            cy.findByTestId('profile-wrapper').contains('Edit Profile').click();
            cy.url().should(
                'eq',
                `${Cypress.config().baseUrl}${Cypress.env('editProfileUrl')}`,
            );
            cy.go('back');
            cy.findByTestId('profile-button').click();

            // change password and link
            cy.findByTestId('profile-wrapper')
                .contains(`Change Password`)
                .should('exist');
            cy.findByTestId('profile-wrapper')
                .contains(`Change Password`)
                .click();
            cy.url().should(
                'eq',
                `${Cypress.config().baseUrl}${Cypress.env(
                    'changePasswordUrl',
                )}`,
            );
            cy.go('back');
            cy.findByTestId('profile-button').click();

            // reading list and link
            cy.findByTestId('profile-wrapper')
                .contains(`Reading List`)
                .should('exist');
            cy.findByTestId('profile-wrapper').contains(`Reading List`).click();
            cy.url().should(
                'eq',
                `${Cypress.config().baseUrl}${Cypress.env('readingListUrl')}`,
            );
            cy.go('back');
            cy.findByTestId('profile-button').click();

            // logout
            cy.findByTestId('profile-wrapper')
                .contains(`Logout`)
                .should('exist');

            // // remove profile wrapper
            cy.findByTestId('navbar-black-area').click();
            cy.findByTestId('profile-wrapper').should('not.exist');
            cy.findByTestId('navbar-black-area').should('not.exist');

            // check  logout link
            cy.findByTestId('profile-button').click();
            cy.findByTestId('profile-wrapper').contains(`Logout`).click();
            cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        });
    });
});
