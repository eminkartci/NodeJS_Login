
// Check if session secret is matching
if(process.env.NODE_ENV != 'production') {
    // If not require
    require('dotenv').config()
}
// CONST
    // Express
const express = require('express')
const app = express()

    // Bcrypt
const bcrypt = require('bcrypt')

    // Users
const users = []

    // Passport initialize
const passport = require('passport')
const initializePassport = require('./passport-config')

    // call initialize function
initializePassport(
    passport, // First Parameter
    email => users.find( user => user.email === email) // Method -> Get User By Email
)

    // Flash
const flash = require('express-flash')
const session = require('express-session')


// SETs

    // view engine
app.set('view-engine','ejs');

    // url encoded
app.use(express.urlencoded({extended: false}))

    // flash
app.use(flash())

    // Session
app.use(session({
    secret: process.env.SESSION_SECRET
}))


// GETS

// Index Page
app.get('/', (req,res) => {
 res.render('index.ejs', { name: ' Emin '})
})

app.get('/register', (req,res) => {
    res.render('register.ejs')
})

app.get('/login', (req,res) => {
    res.render('login.ejs')
})


// POSYS

    // Register Operations
app.post('/register', async (req,res) => {

    try {
        // crypt the passport
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        // Append the user list
        users.push({
            id: Date.now().toString(),
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        })
        // Inform
        console.log("User is registered successfully !")
        // Print the users
        console.log(users)
        // Then redirect login page
        res.redirect('/login');
    
    // Any problen occurs
    } catch (error) {
        // Inform
        console.log("A Problem has occured !!")
        // redirect register again
        res.redirect('/register');
    }
    
    // Print the users
})

app.post('/login', (req,res) => {

})

// Listen to Port 1122
app.listen(1122,() => {
    console.log("App is listening port: localhost/1122")
})