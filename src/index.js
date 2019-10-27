const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exhbs = require('express-handlebars');
const override = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const Router = require('./routes/index');
const RouterUsers = require('./routes/users');
const { connectionDataBase } = require('./db/db');
const passport = require('passport');
const server = express();

//data Base
connectionDataBase();
require('./config/passport');
//settings
server.set('port', process.env.PORT || 4000);
server.set('views', path.join(__dirname, 'views'));
server.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(server.get('views'), 'layouts'),
    partialsDir: path.join(server.get('views'), 'partials'),
    extname: '.hbs'
}));
server.set('view engine', '.hbs');
//middleweres
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(override('_method'));
server.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
//global variables
server.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error_msg = req.flash('error');
    res.locals.user = req.user || null;
    next();
})
//routes
server.use('/', Router);
server.use('/', RouterUsers);
//static file
server.use(express.static(path.join(__dirname, 'public')));
//server
server.listen(server.get('port'), () => {
    console.log('server listen on port ' + server.get('port'));
})