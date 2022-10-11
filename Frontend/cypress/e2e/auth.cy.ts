import { createRandomUser } from '../support/generateRandomUser';

describe('Authenticated', () => {
    beforeEach(() => {
        cy.checkLoaderRemoved();
        cy.clearCookies();
    });

    it('Signup Page UI', () => {
        cy.visit(Cypress.env('signupUrl'));

        // check oauth
        cy.oauthCheckText();

        // check header
        cy.contains('Create New Account').should('exist');

        // check label text
        cy.findByTestId('signup-form').contains('label', 'Full Name');
        cy.findByLabelText('Full Name').should('exist');
        cy.findByPlaceholderText('Coder social').should('exist');

        cy.findByTestId('signup-form').contains('label', 'Email');
        cy.findByLabelText('Email').should('exist');
        cy.findByPlaceholderText('email@codersocial.dev').should('exist');

        cy.get('.avatar-image').should('exist');
        cy.findByTestId('signup-form').contains(
            'label',
            'Choose a different photo',
        );
        cy.findByLabelText('Choose a different photo').should('exist');
        cy.get('#avatar-input').should('exist');

        cy.findByTestId('signup-form').contains('label', 'Password');
        cy.findByLabelText('Password').should('exist');

        // check submit page
        cy.findByTestId('signup-form-button-submit').should('exist');

        // check login page
        cy.findByTestId('signup-form').contains('a', 'Log in');

        // check links
        cy.contains('a', 'Coder Social').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.go('back');

        cy.findByTestId('login-button-form').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('loginUrl')}`,
        );
        cy.go('back');
    });

    it('Login Page UI', () => {
        cy.visit(Cypress.env('loginUrl'));

        // check oauth
        cy.oauthCheckText();

        // check header
        cy.contains('div', 'Log in').should('exist');

        // check label text
        cy.findByTestId('login-form').contains('label', 'Email');
        cy.findByLabelText('Email').should('exist');
        cy.findByPlaceholderText('email@codersocial.dev').should('exist');

        cy.findByTestId('login-form').contains('label', 'Password');
        cy.findByLabelText('Password').should('exist');

        // check login button
        cy.findByTestId('login-form-button-submit').should('exist');

        // check empty form
        cy.findByTestId('login-form-button-submit').click();
        cy.contains('Fill All Details').should('exist');

        // check forgot password
        cy.contains('a', 'Forgot Password').should('exist');

        // links
        cy.contains('a', 'Coder Social').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.go('back');

        cy.contains('a', 'Forgot Password').click();
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('forgotPasswordUrl')}`,
        );
        cy.go('back');
    });

    it('Forgot Password UI', () => {
        cy.visit(Cypress.env('forgotPasswordUrl'));

        cy.contains('div', 'Welcome to Coder Social Community').should('exist');

        // check header
        cy.contains('div', 'Forgot Password?').should('exist');

        // check email
        cy.findByTestId('forgot-password-form').contains('label', 'Email');
        cy.findByLabelText('Email').should('exist');
        cy.findByPlaceholderText('Enter your email...').should('exist');

        //   check button
        cy.findByTestId('forgot-password-form').contains('button', 'Continue');
        cy.findByTestId('forgot-password-form-button').should('exist');

        // check empty form
        cy.findByTestId('forgot-password-form-button').click();
        cy.contains('Fill Email').should('exist');

        // links
        cy.contains('a', 'Coder Social').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.go('back');
    });

    it('Login Invalid', () => {
        cy.visit(Cypress.env('loginUrl'));

        const user = createRandomUser();

        cy.findByLabelText('Email').type(user.email);
        cy.findByLabelText('Password').type(user.password);

        cy.findByTestId('login-form-button-submit').click();

        cy.contains('Login Failed').should('exist');
    });

    it('Login', () => {
        cy.visit(Cypress.env('loginUrl'));

        cy.findByLabelText('Email').type(Cypress.env('userEmail'));
        cy.findByLabelText('Password').type(Cypress.env('userPassword'));

        cy.findByTestId('login-form-button-submit').click();

        cy.contains('Login Success').should('exist');

        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });

    it.only('Signup', () => {
        cy.visit(Cypress.env('signupUrl'));

        const user = createRandomUser();

        cy.findByLabelText('Full Name').type(user.name);
        cy.findByLabelText('Email').type(user.email);
        cy.get('#avatar-input').attachFile('avatar.jpg');

        cy.findByLabelText('Password').type(user.password);
        cy.findByTestId('signup-form-button-submit').click();

        cy.wait(4500);

        cy.contains('Signup Success').should('exist');
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.findByTestId('profile-button').click();
        cy.findByTestId('profile-wrapper').should(
            'contain',
            user.email.substring(0, user.email.lastIndexOf('@')),
        );
        cy.findByTestId('profile-wrapper').contains(`Logout`).click();

        cy.wait(1000);
        cy.contains('Logout Success').should('exist');

        cy.visit(Cypress.env('loginUrl'));
        cy.findByLabelText('Email').type(user.email);
        cy.findByLabelText('Password').type(user.password);
        cy.findByTestId('login-form-button-submit').click();

        cy.wait(1500);

        cy.contains('Login Success').should('exist');

        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
});
