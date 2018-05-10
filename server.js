const config=require('config');
const auth=require('./routes/auth');
const booking= require('./routes/booking')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
    key: sslkey,
    cert: sslcert
};

https.createServer(options, app).listen(3000, (err) => {
    if (err) throw err;
    else {
        console.log('connected to secure server');

    }
});

http.createServer((req, res) => {
    res.writeHead(301, { 'Location': 'https://localhost:3000' + req.url });
    res.end();
}).listen(8080);



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



app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/auth',auth);
app.use('/api/booking',booking)

//mongoose.connect('mongodb://['+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+']@'+process.env.DB_HOST+':27017/'+process.env.DB_DATABASE);

app.get('/', (req, res) => {
    res.send('This is get')
})