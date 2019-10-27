const User = require('../models/user');
module.exports = {
    signinView: (req, res, next ) => {
        res.render('users/signin');
    },
    signupView: (req, res, next ) => {
        res.render('users/signup');
    },
    signup: async (req, res, next) => {
        const { userName, email, password, confirmPassword } = req.body; 
        const errors = [];
        if(!userName){
            errors.push({text: 'please, write an user name'});
        }
        if(!email){
            errors.push({text: 'please, write an email'});
        }
        if(!password){
            errors.push({text: 'please, write an password'});
        }
        if(!confirmPassword){
            errors.push({text: 'please, write an password'});
        }
        if(password != confirmPassword){
            errors.push({text: 'password no not match'})
        }
        if(errors.length > 0){
            res.render('users/signup',{
                errors,
                userName,
                email
            })
        }else{
            const emailUser = await User.findOne({email: email}); 
            if(emailUser){
                req.flash('error_msg', 'the email is already in use');
                res.redirect('/users/signup');
            }
            const user = new User({userName,email,password});
            user.password = await user.encryptPassword(user.password);
            await user.save();
            req.flash('success_msg', 'you are registered');
            res.redirect('/users/signin');
        }
    },
    home: (req, res, next) => {
        res.render('layouts/home');
    },
    logout: (req, res, next ) => {
        req.logout();
        res.redirect('/');
    }
}