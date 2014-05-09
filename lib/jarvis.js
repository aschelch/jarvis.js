var program = require('commander'),
    fs = require('fs'),
    //readline = require('readline'),
    //rl = readline.createInterface(process.stdin, process.stdout),
    config = require('../config.json');

/*

program
  .version('1.0.0')
  .option('-v, --voice [Loic]', 'Voxygen voice to use in tts (Loic, Agnes, Melodine, Chut, Bicool, Philippe, Electra, Damien, DarkVadoor, Ramboo, John, Helene, Eva, JeanJean, Papi, Robot, Sidoo, Sorciere, Yeti, Zozo)', 'Loic')
  .parse(process.argv);


var tts = require('tts')({
    voice: program.voice
});

var modules = [];

function log(msg){
  console.log("[jarvis] "+msg);
}

log("Starting...");

// Load modules
log("Loading modules...");
fs.readdir('./lib/modules', function(err, files){
  files.forEach(function(file) {
    var name = file.slice(0, -3); // remove .js
    log("Loading module : "+name);
    modules.push(require('./modules/'+name)(config[name]));
  });
  log("Module loaded");

  start();
});

function start(){

  tts.say(["Bonjour monsieur. Que puis-je faire pour vous ?"]);

  rl.prompt();
  rl.on('line', function(line) {

    modules.forEach(function(module) {
      module.process(line);
    });

    rl.prompt();
  }).on('close', function() {
      tts.say(["Au revoir monsieur", "A bientôt"]);
      process.exit(0);
  });

}

*/

exports = module.exports = Jarvis;

function Jarvis(options){
    this.plugins = [];
}

Jarvis.prototype.log = function(msg){
    console.log("[jarvis] "+msg);
};

Jarvis.prototype.start = function(){
    this._loadPlugins();
};

Jarvis.prototype.getPlugin = function(name){
    return this.plugins[name];
};

Jarvis.prototype._loadPlugins = function(fn){
  fn = fn || function(){};

    this.log("loading plugins...");

    var self = this;
    fs.readdir('./lib/plugins', function(err, files){

      files.forEach(function(file) {
        var name = file.slice(0, -3); // remove .js

        self.log("Loading plugin : "+name);

        var Plugin = require('./plugins/'+name);
        var plugin = new Plugin(self, config[name]);

        self.plugins[plugin.name] = plugin;

      });

      self.log("plugins loaded");

      self.log("Starting plugin...");
      for(var i in self.plugins){
        self.plugins[i].start();
      }
      self.log("plugins started");

      fn();
    });
};
