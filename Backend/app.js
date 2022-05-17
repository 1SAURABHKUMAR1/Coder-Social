require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const nocache = require('nocache');
const passportConfig = require('./passport/passport');
const passport = require('passport');

// middlewares
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};
app.use(cors(corsOption));
app.use(nocache());

app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    }),
);

app.use(passport.initialize());

app.set('view engine', 'ejs');

// ejs
app.get('/', (req, res) => {
    res.render('home');
});

// router
const home = require('./Routes/home');
const user = require('./Routes/user');
const oauth = require('./Routes/oauth');
const post = require('./Routes/post');

// router middleware
app.use('/api/v1', home);
app.use('/api/v1', user);
app.use('/api/v1', oauth);
app.use('/api/v1', post);

module.exports = app;
