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
const { Server } = require('socket.io');
const httpsServer = require('http').createServer(app);
const helmet = require('helmet');

// middlewares
app.use(morgan('tiny'));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};
app.use(cors(corsOption));
app.use(nocache());
app.use(helmet());

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
const comment = require('./Routes/comment');
const tag = require('./Routes/tag');
const notification = require('./Routes/notification');
const { socketHandler } = require('./Utils/Socket');

// router middleware
app.use('/api/v1', home);
app.use('/api/v1', user);
app.use('/api/v1', oauth);
app.use('/api/v1', post);
app.use('/api/v1', comment);
app.use('/api/v1', tag);
app.use('/api/v1', notification);

const io = new Server(httpsServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT'],
        credentials: true,
    },
});
socketHandler(io);

exports.app = app;
exports.httpsServer = httpsServer;
