require('dotenv').config();
require('./passport/passport');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// middlewares
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOption = {
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOption));

app.use(cookieParser());

app.set('trust proxy', 1);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    }),
);

app.set('view engine', 'ejs');

// ejs
app.get('/', (req, res) => {
    res.render('home');
});

// router
const home = require('./Routes/home');
const user = require('./Routes/user');

// router middleware
app.use('/api/v1', home);
app.use('/api/v1', user);

module.exports = app;
