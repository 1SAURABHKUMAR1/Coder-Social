const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

// TODO:
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: 'http://localhost:4000/api/v1/auth/google/callback',
//         },
//         (accessToken, refreshToken, profile, callback) => {
//             //   call back fn
//         },
//     ),
// );
