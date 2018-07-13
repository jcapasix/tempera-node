// 1. Include Packages
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var cors = require("cors");
var logger = require('morgan');
const http = require('http');
const jwt = require('jsonwebtoken');


const socketio = require('socket.io');
const server = http.createServer(express);
const io = socketio.listen(server);


// 2. Include Configuration
var config = require('./config');

// 3. Initialize the application 
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 4. Force https in production
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}

// 5. Connect to MongoDB
mongoose.connect(config.MONGO_URI, {
  useMongoClient: true
}); // db connection
mongoose.Promise = global.Promise;


// 6. Load app routes
require('./routes')(app);

// 7. Start the server
app.listen(config.LISTEN_PORT, function(){
    console.log('listening on port ' + config.LISTEN_PORT);
});

//SERIAL COMUNICATION
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort("COM4", {
    baudRate: 9600
  });

  const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

  parser.on('open', function () {
    console.log('connection is opened');
  });

  parser.on('data', function (data) {   
    let temp=parseInt(data, 10) + " C°";
    console.log(temp);   
    io.emit('Temperatura',data)
  });

  parser.on('error', function (err) {   
    console.log(err);   
  });
  port.on('error', function (err) {   
    console.log(err);   
  });