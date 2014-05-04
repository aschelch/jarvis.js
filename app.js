var exec = require('child_process').exec;

var speak = require('./modules/speak.js');
var weather = require('./modules/weather.js');
var example = require('./modules/example.js');

console.log("Starting Jarvis...");

speak.start();
weather.start();
example.start();

console.log("Jarvis started");

