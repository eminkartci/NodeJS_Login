
// CONST
    // Express
const express = require('express')
const app = express()

// SETs

    // view engine
app.set('view-engine','ejs');

    // url encoded
app.use(express.urlencoded({extended: false}))


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

app.post('/register', (req,res) => {

})

app.post('/login', (req,res) => {

})

// Listen to Port 1122
app.listen(1122,() => {
    console.log("App is listening port: localhost/1122")
})