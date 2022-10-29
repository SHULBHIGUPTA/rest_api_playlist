const express = require('express');
const bodyParser = require('body-parser'); //middleware
const mongoose = require('mongoose');


//set up express app
const app = express();

//cpnnect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;


//get request
// app.get('/api', function(req, res) {
//     console.log('GET request');
//     res.send({name: "shulbhi"});
// })

app.use(bodyParser.json())

//initialize routes
app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next){
    //console.log(err)
    res.status(422).send({error: err.message})
})


//listen for requests
app.listen(process.env.port || 4000,function() {
console.log('now listening for requests');
})