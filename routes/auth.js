const app = require('express').Router();
const passport = require('passport');
const GOOGLE_CLIENT_ID = "337840481002-6r65l3p55j070beocuol2nhtvi8cb342.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET="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";
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://consultant1.herokuapp.com/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));


passport.serializeUser(function(user,done){
  done(null,user)
});

passport.deserializeUser(function(user,done){
  done(null,user)
});

module.exports = app