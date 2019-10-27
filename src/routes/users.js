const router = require('express-promise-router')();
const { signinView, signupView, signup, home, logout } = require('../controllers/users');
const { isAuthenticated } =require('../helpers/auths');
const passport = require('passport');

//sign in
router.get('/users/signin', signinView);
router.post('/users/signin', passport.authenticate('local',{
    successRedirect: '/users/home',
    failureRedirect: '/users/signin',
    failureFlash: true
}));
//sign in

//sign up
router.get('/users/signup', signupView);
router.post('/users/signup', signup);
//sign up

//home
router.get('/users/home', isAuthenticated, home);
//home

//logout
router.get('/users/logout', logout);
//logout
module.exports = router;
