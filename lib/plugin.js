var util = require('util');

exports = module.exports = Plugin;

function Plugin(jarvis, options){
    options = options || {};

    this.jarvis = jarvis;
    this.name = '';
    this.debug = options.debug || false;
 };

Plugin.prototype.create = function(){
    this.log("create");
};

Plugin.prototype.start = function(){
    this.log("start");
};

Plugin.prototype.process = function(cmd){
    this.log("process("+cmd+")");
};

Plugin.prototype.log = function(msg){
    if(this.debug) console.log("["+this.name+"] "+msg);
};

Plugin.prototype.stop = function(){
    this.log("stop");
};

Plugin.prototype.destroy = function(){
    this.log("destroy");
};
