const app = require('express').Router();
const passport = require('passport');
const GOOGLE_CLIENT_ID = "337840481002-kh0vo87sapvimgs1l8upk81qjb3isbb6.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET="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";
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
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