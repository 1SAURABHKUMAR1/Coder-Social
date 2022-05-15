const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User');
const cloudinary = require('cloudinary').v2;

//  google oauth
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, next) => {
            const userDB = await User.findOne({
                email: profile._json.email,
            });

            if (userDB) {
                next(null, userDB);
            } else {
                const cloudinaryPhoto = await cloudinary.uploader.upload(
                    profile._json.picture,
                    {
                        folder: 'codersocial',
                        width: 250,
                        crop: 'fit',
                    },
                );

                const username = `${profile._json.given_name}${Math.floor(
                    Math.random() * 9999 + 1000,
                )}`;

                try {
                    const user = await User.create({
                        name: profile.displayName,
                        email: profile._json.email,
                        username: username,
                        social_id: profile.id,
                        profile_photo: {
                            id: cloudinaryPhoto.public_id,
                            secure_url: cloudinaryPhoto.secure_url,
                        },
                    });

                    next(null, user);
                } catch (error) {
                    console.log(error);
                    next(null, null);
                }
            }
        },
    ),
);

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (email, done) {
    User.findOne(email, function (err, user) {
        done(err, user);
    });
});
