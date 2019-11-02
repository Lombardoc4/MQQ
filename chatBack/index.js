const express = require('express');
const app = express();
const bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose');

// const path = require('path');
// const socketio  = require('socket.io');
const dotenv = require('dotenv').config()
const routes = require('./routes');


const PORT = process.env.PORT;
var server = app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

app.use(cors());
const pass = process.env.MONGO + '';
//change the database
mongoose.connect(pass, {dbName : 'QuoteQuiz'});

// why connect data is local
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");

}).catch(function (error){
  console.log(error);
});

app.use(bodyParser.json());
app.use('/', routes);

// i can use socket for something if needed
// var io = require('./socket/socket.js').listen(server);

// app.use(express.static(path.join(__dirname, 'chatSocket')));
