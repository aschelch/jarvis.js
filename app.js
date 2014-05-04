var program = require('commander');

program
  .version('0.0.1')
  .option('-v, --verbose', 'display logs')
  .parse(process.argv);

var speak = require('./modules/speak.js');
var weather = require('./modules/weather.js');
var example = require('./modules/example.js');
var torrent = require('./modules/torrent.js');

if(program.verbose) console.log("Starting Jarvis...");

speak.start();
weather.start();
example.start();
torrent.start();

if(program.verbose) console.log("Jarvis started");
