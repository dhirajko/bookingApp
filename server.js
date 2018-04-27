const config=require('config');
const auth=require('./routes/auth');
const booking= require('./routes/booking')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users')
const app = express();


if(!config.get('jwtPrivateKey')){
    console.error('Fatal Errot: jwtPrivateKey is not definde');
    process.exit(1);
}


//TODO: dotenv?
mongoose.connect('mongodb://localhost:27017/udemy', (err) => {
    if (err) throw err;
    else {
        console.log('connected to database');

    }
})

//TODO: HTTPS!!!!!!!!!!!!!!!!!!!!!!
app.listen(3000, (err) => {
    if (err) throw err;
    else {
        console.log('connected to server');

    }
})


app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/auth',auth);
app.use('/api/booking',booking)

//mongoose.connect('mongodb://['+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+']@'+process.env.DB_HOST+':27017/'+process.env.DB_DATABASE);

app.get('/', (req, res) => {
    res.send('This is get')
})