
const express = require('express')
const app = express()

// Set view engine
app.set('view-engine','ejs');


// Index Page
app.get('/', (req,res) => {
 res.render('index.ejs', { name: ' Emin '})
})


// Listen to Port 1122
app.listen(1122,() => {
    console.log("App is listening port: localhost/1122")
})