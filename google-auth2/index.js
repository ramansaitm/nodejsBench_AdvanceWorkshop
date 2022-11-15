const passport =require("passport")
import User from '../app/models/user'
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt =require('jsonwebtoken')

module.exports = function (passport) {
    passport.use(
      new GoogleStrategy(
        {
          clientID:"920697318208-ggphgb8u28ehnliujail7n2nbrhsi7m4.apps.googleusercontent.com",
          clientSecret:"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",
          callbackURL:"http://localhost:3000/auth/google/callback",
        },
    async (accessToken, refreshToken, profile, done) => {
        //get the user data from google 
        const newUser = {
         googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        }

        try {
          let user = await User.findOne({ googleId: profile.id })
          if (user) {
            const token =jwt.sign({_id:user._id},process.env.SECRETKEY,{expiresIn:"1h",})
            console.log("authentication token :"+token);
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
