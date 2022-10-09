describe('User Profile', () => {
    it('Current User Profile', () => {
        cy.login().then((user) => {
            cy.visit(`${Cypress.env('userProfileUrl')}/${user.username}`);

            cy.findByTestId('profile-photo').should('exist');
            cy.findByTestId('profile-photo').should(
                'have.attr',
                'src',
                user.profile_photo.secure_url,
            );

            cy.findByTestId('edit-profile-button').should('exist');
            cy.findByTestId('edit-profile-button').click();
            cy.url().should(
                'eq',
                `${Cypress.config().baseUrl}${Cypress.env('editProfileUrl')}`,
            );
            cy.go('back');

            cy.findByTestId('user-name').should('contain', user.name);

            user.bio && cy.contains(user.bio).should('exist');

            user.location && cy.contains(user.location).should('exist');

            cy.contains(`Joined on`).should('exist');

            user.portfolio_link &&
                cy.contains(user.portfolio_link).should('exist');

            user.githubUrl && cy.contains(user.githubUrl).should('exist');

            user.twitterUrl && cy.contains(user.twitterUrl).should('exist');

            user.education && cy.contains(user.education).should('exist');

            user.work && cy.contains(user.work).should('exist');

            cy.findByTestId(`user-followers`).should('contain', `Followers`);
            cy.findByTestId(`user-followers`).should(
                'contain',
                user.followers.length,
            );

            cy.findByTestId(`user-following`).should('contain', `Following`);
            cy.findByTestId(`user-following`).should(
                'contain',
                user.following.length,
            );

            cy.findByTestId('profile-sidebar').should('contain', 'Works');

            cy.findByTestId('profile-sidebar').should(
                'contain',
                'Skills/Languages',
            );

            cy.contains(
                `${user.posts.length ? user.posts.length : '0'} post published`,
            ).should('exist');

            cy.contains(
                `${
                    user.comments.length ? user.comments.length : '0'
                } comments written`,
            ).should('exist');

            cy.contains(
                `${user.tags.length ? user.tags.length : '0'} tags followed`,
            ).should('exist');

            user.posts.length !== 0
                ? cy.findAllByTestId('single-post').should('exist')
                : cy.findAllByTestId('single-post').should('not.exist');
        });
    });

    it('Edit Profile', () => {
        cy.login().then((user) => {
            cy.visit(Cypress.env('editProfileUrl'));

            // check header
            cy.contains('div', 'Profile Settings').should('exist');

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Name',
            );
            cy.findByLabelText('Name').should('exist');
            cy.findByLabelText('Name').should(
                'have.value',
                user.name ? user.name : '',
            );

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Email',
            );
            cy.findByLabelText('Email').should('exist');
            cy.findByLabelText('Email').should(
                'have.value',
                user.email ? user.email : '',
            );

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Username',
            );
            cy.findByLabelText('Username').should('exist');
            cy.findByLabelText('Username').should(
                'have.value',
                user.username ? user.username : '',
            );

            cy.get('.avatar-image').should('exist');
            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Choose a different photo',
            );
            cy.findByLabelText('Choose a different photo').should('exist');
            cy.get('.avatar-image').should(
                'have.attr',
                'src',
                user.profile_photo.secure_url,
            );

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Bio',
            );
            cy.findByLabelText('Bio').should('exist');
            cy.findByLabelText('Bio').should(
                'have.value',
                user.bio ? user.bio : '',
            );

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Portfolio Link',
            );
            cy.findByLabelText('Portfolio Link').should('exist');
            cy.findByLabelText('Portfolio Link').should(
                'have.value',
                user.portfolio_link ? user.portfolio_link : '',
            );

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Work',
            );
            cy.findByLabelText('Work').should('exist');
            cy.findByLabelText('Work').should(
                'have.value',
                user.work ? user.work : '',
            );

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Skills',
            );
            cy.findByLabelText('Skills').should('exist');

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Education',
            );
            cy.findByLabelText('Education').should('exist');
            cy.findByLabelText('Education').should(
                'have.value',
                user.education ? user.education : '',
            );

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Location',
            );
            cy.findByLabelText('Location').should('exist');
            cy.findByLabelText('Location').should(
                'have.value',
                user.location ? user.location : '',
            );

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Github Profile Url',
            );
            cy.findByLabelText('Github Profile Url').should('exist');

            cy.findAllByTestId('edit-profile-component').contains(
                'label',
                'Twitter Profile Url',
            );
            cy.findByLabelText('Twitter Profile Url').should('exist');

            // buttons
            cy.findByTestId('edit-profile-save-changes').should('exist');
            cy.findByTestId('edit-profile-delete-account').should('exist');

            // delete account modal
            cy.findByTestId('edit-profile-delete-account').click();
            cy.findByTestId('delete-account-modal').should('exist');
            cy.findByTestId('delete-account-modal').contains(
                'Confirm Deletion of Account?',
            );
            cy.findByTestId('delete-account-modal-close').should('exist');
            cy.findByTestId('delete-account-modal').contains('Delete Account');

            // close account
            cy.findByTestId('delete-account-modal-close').click();
            cy.findByTestId('delete-account-modal').should('not.exist');
        });
    });

    it('Change Password', () => {
        cy.login();

        cy.visit(Cypress.env('changePasswordUrl'));

        // check header
        cy.contains('div', 'Change Password').should('exist');

        // check fields
        cy.findAllByTestId('change-password-form').contains(
            'label',
            'Old Password',
        );
        cy.findByLabelText('Old Password').should('exist');

        cy.findAllByTestId('change-password-form').contains(
            'label',
            'Old Password',
        );
        cy.findByLabelText('Old Password').should('exist');

        // buttons
        cy.findAllByTestId('change-password-form').contains(
            'button',
            'Change Password',
        );
        cy.findByTestId('change-password-button').should('exist');
    });

    it('Empty Change Password', () => {
        cy.login();

        cy.visit(Cypress.env('changePasswordUrl'));
        cy.findByTestId('change-password-button').click();
        cy.wait(200);
        cy.contains('Fill All Details!').should('exist');
    });
});
