var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
       },
        function(email, password, done) {
            // check in mongodb if a user with email exists or not
            User.findOne({ 'email' :  email },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Email does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with email '+email);
                        return done(null, false, { message : 'Incorrect email.' });
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, { message : 'Incorrect email.' }); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    done(null, user);
                }
            );

        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

}
