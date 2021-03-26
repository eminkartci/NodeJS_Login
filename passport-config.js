
// Import Local Strategy
const LocalStrategy = require('passport-local').Strategy

// Check Passport by Bcrypt
const bcrypt = require('bcrypt');


// initialize passport
function initialize( passport, getUserByEmail, getUserById) {

    // Authenticate Function
    const authenticateUser = async (email, password, done) => {
        // Get user by email
        const user = getUserByEmail(email)

        // check if the user exists
        if(user == null){
            // return done
                // error -> null
                // user  -> false
                // message
            return done(null,false, {message : "User cannot be founded! "});
        }

        // If the user is founded check password
        try{
            // If the passwords are matching
            if(await bcrypt.compare(password,user.password)){
                // return 
                // error -> null
                // user  -> user
                return done(null,user)
            // Otherwise
            }else{
                // return done
                // error -> null
                // user  -> false
                // message
            return done(null,false, {message : "The password is wrong! "});
            }
        // If any problem occurs
        } catch (e) {
            // return done
                // error -> e
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    
    // Serialize User
    passport.serializeUser((user,done) => done(null,user.id))

    // Deserialize User
    passport.deserializeUser((id,done) => {
        return done(null,getUserById(id))
    })

}

module.exports = initialize