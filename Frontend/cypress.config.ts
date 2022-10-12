import { defineConfig } from 'cypress';

export default defineConfig({
    projectId: 's3pkyg',
    e2e: {
        baseUrl: 'http://localhost:3000',
        video: false,
        screenshotOnRunFailure: false,
    },
    env: {
        apiUrl: 'http://localhost:4000/api/v1',
        loginUrl: '/login',
        signupUrl: '/signup',
        forgotPasswordUrl: '/forgotpassword',
        userProfileUrl: '/user/profile',
        editProfileUrl: '/user/profile/edit',
        createPostUrl: '/post/new',
        postUrl: '/post',
        notificationUrl: '/user/notification',
        changePasswordUrl: '/user/profile/password',
        readingListUrl: '/user/readinglist',
        tagsUrl: '/tags',
        singleTagsUrl: '/tag',
        searchUrl: '/post/search',
        userEmail: 'email@gmail.com',
        userPassword: 'Saurabh',
        loginUrlBackend: '/login',
        postUrlBackend: '/post',
        tagsUrlBackend: '/tags',
        singleTagUrlBackend: '/tag',
        searchUrlBackend: '/post/filter?search=',
    },
});
