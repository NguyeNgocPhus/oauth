const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require("../model/user.model");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("228010455349-aoubftmprmmdq1a48hcse6ehdnd3ccia.apps.googleusercontent.com");
const jwt = require("jsonwebtoken");
passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, async(accessToken,refreshToken,profile,done) => {

        const userExist = await User.findOne({googleId:profile.id});
    
        if(userExist){
            //console.log('current user',userExist);
           // done(null,userExist);
        } 
        else{
            const user = await User.create({
                username:profile.displayName,
                googleId:profile.id
            })
            //done(null,user)
        }  
        
    })
);
