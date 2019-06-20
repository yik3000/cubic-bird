/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
//const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

const config = require('./config');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
//const apiController = require('./controllers/api-old');
const contactController = require('./controllers/contact');
const coachController = require('./controllers/coach');
const studentController = require('./controllers/student');
const curriculmnController = require('./controllers/curriculumn');
const courseController = require('./controllers/course');
const classRoomController = require('./controllers/classroom');
const ratingController = require('./controllers/rating');
/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user
    && req.path !== '/login'
    && req.path !== '/signup'
    && !req.path.match(/^\/auth/)
    && !req.path.match(/\./)) {
    req.session.returnTo = req.originalUrl;
  } else if (req.user
    && (req.path === '/account' || req.path.match(/^\/api/))) {
    req.session.returnTo = req.originalUrl;
  }
  next();
});
app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/chart.js/dist'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);


app.get('/coach', coachController.index);
app.get('/coach/add', coachController.add);
app.post('/coach/add', coachController.postAdd);
app.get('/coach/edit/:id',coachController.getEdit);
app.post('/coach/edit/:id',coachController.postEdit);

app.get('/bird', studentController.index);
app.get('/bird/add', studentController.add);
app.post('/bird/add', studentController.postAdd);
app.get('/bird/edit/:id',studentController.getEdit);
app.post('/bird/edit/:id',studentController.postEdit);




app.get('/course', courseController.index);
app.get('/course/add', courseController.add);
app.post('/course/add', courseController.postAdd);
app.get('/course/edit/:id',courseController.getEdit);
app.post('/course/edit/:id',courseController.postEdit);

app.get('/curriculumn', curriculmnController.index);
app.get('/curriculumn/add', curriculmnController.add);
app.post('/curriculumn/add', curriculmnController.postAdd);
app.get('/curriculumn/edit/:id',curriculmnController.getEdit);
app.post('/curriculumn/edit/:id',curriculmnController.postEdit);

app.get('/classroom',classRoomController.index);
app.get('/classroom/edit/:id', classRoomController.edit);
app.post('/classroom/edit/:id', classRoomController.postEdit);

app.get('/classroom/add', classRoomController.addOne);
app.post('/classroom/add', classRoomController.postAddOne);
app.get('/classroom/add2/:id',classRoomController.addTwo);
app.post('/classroom/add2/:id',classRoomController.postAddTwo);
app.get('/classroom/add3/:id',classRoomController.addThree);
app.post('/classroom/add3/:id',classRoomController.postAddThree);
app.get('/classroom/add4/:id',classRoomController.addFour);
app.post('/classroom/add4/:id',classRoomController.postAddFour);

app.get('/rating',ratingController.index);
app.post('/rating/group',ratingController.addGroup);
app.get('/rating/group',ratingController.addGroup);



const apiWechatController = require('./api/wechat');
apiWechatController(app,config);


/**
 * API examples routes.
 */
//app.get('/api', apiController.getApi);

/**
 * OAuth authentication routes. (Sign in)
 */


/**
 * OAuth authorization routes. (API examples)
 */

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
