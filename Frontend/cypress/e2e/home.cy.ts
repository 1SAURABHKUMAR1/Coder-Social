describe('Check Home Ui', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.clearCookies();

        cy.checkLoaderRemoved();
    });

    it('Check Website Alive', () => {
        // check for tags section
        cy.findAllByText('Home').should('exist');
        cy.findAllByText('Tags').should('exist');
    });

    it('Check Home Unauthticated', () => {
        // left side bar about

        cy.findAllByTestId('home-about')
            .contains('a', 'Create Account')
            .should('exist');
        cy.findAllByTestId('home-about')
            .contains('a', 'Log in')
            .should('exist');

        // check if tags exits
        cy.findAllByTestId('tags-home')
            .children('li')
            .contains('Home')
            .should('exist');

        cy.findAllByTestId('tags-home')
            .children('li')
            .contains('Tags')
            .should('exist');

        // check auth
        cy.contains('Create Account');
        cy.contains('Log in');

        // check news discuss tags
        cy.contains('#news');
        cy.contains('#discuss');
        cy.contains('#webdev');

        //check post
        cy.findAllByTestId('single-post').should('exist');

        // check footer
        cy.contains(
            'Coder Socialis a inclusive network for software developer',
        ).should('exist');

        // icons social links
        cy.get('[href="https://twitter.com/1SAURABHKUMAR1"]').should('exist');
        cy.get('[href="https://github.com/1SAURABHKUMAR1"]').should('exist');
        cy.get('[href="https://www.linkedin.com/in/1saurabhkumar1/"]').should(
            'exist',
        );
    });

    it('Check Home Authenticated', () => {
        cy.login();
        cy.visit('/');

        cy.findAllByTestId('tags-home')
            .children('li')
            .contains('Reading List')
            .should('exist');

        cy.findAllByTestId('tags-home')
            .children('li')
            .contains('Reading List')
            .click();
        cy.url().should(
            'contain',
            `${Cypress.config().baseUrl}${Cypress.env('readingListUrl')}`,
        );
        cy.go('back');
    });
});
