var util = require('util');

exports = module.exports = Plugin;

function Plugin(app, options){
    this.app = app;
    this.name = '';
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
    console.log("["+this.name+"] "+msg);
};

Plugin.prototype.stop = function(){
    this.log("stop");
};

Plugin.prototype.destroy = function(){
    this.log("destroy");
};
