const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose =  require("mongoose");
const cors = require("cors");
const db = async() =>{
    const connect= await mongoose.connect("mongodb://localhost:27017/oauth",{
        useNewUrlParser: true, // <-- no longer necessary
        useUnifiedTopology: true // <-- no longer necessary
    })
    console.log("connect mongoose ");
}
db();


const app = express();
app.use(cors())
 
// set view engine
app.set('view engine', 'ejs');
app.use(express.json());


// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    console.log("ok");
    res.render('home');
});

app.listen(4000, () => {
    console.log('app now listening for requests on port 3000');
});
