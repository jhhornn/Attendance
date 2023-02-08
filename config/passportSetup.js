const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const Auth = require("../models/auth")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await Auth.findById(id)
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/google/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await Auth.findOne({ googleId: profile.id })
      if (currentUser) {
        done(null, currentUser)
      } else {
        const newUser = new Auth({
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          googleId: profile.id
        })
        console.log(profile)
        console.log(newUser)
        const savedUser = await newUser.save()
        done(null, savedUser)
      }
    }
  )
)
