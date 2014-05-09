var fs = require('fs');
var config = require('../config.json');

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

Jarvis.prototype.process = function(cmd){
    for(var i in this.plugins){
      this.plugins[i].process(cmd);
    }
};
