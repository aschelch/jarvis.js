var util = require('util');
var Plugin = require('../plugin');

var request = require('request');
var querystring = require('querystring');

exports = module.exports = Freebox;

function Freebox(jarvis, options){
    options = options || {};

    Plugin.call(this, jarvis, options);

    this.name = "freebox"

    this.code = options.code;
    this.hd = options.hd || "hd1";
};

util.inherits(Freebox, Plugin);

Freebox.prototype.pressKey = function(key, fn){
    fn = fn || function(err){};

    var params = {
        code: this.code
    };

    if(typeof key === "string"){
        params.key = key;
    }else if(typeof key === "object"){
        params.key = key.key;
        params.long = key.long || false;
    }

    request("http://"+this.hd+".freebox.fr/pub/remote_control?"+querystring.stringify(params), function(error, response, body){
        fn(error);
    });

}

Freebox.prototype.nextChannel = function(fn){
    pressKey("prgm_inc", fn);
};

Freebox.prototype.previousChannel = function(fn){
    this.pressKey("prgm_dec", fn);
};

Freebox.prototype.home = function(fn){
    this.pressKey("home", fn);
};

Freebox.prototype.mute = function(fn){
    this.pressKey("mute", fn);
};

Freebox.prototype.increaseVolume = function(fn){
    this.pressKey("vol_inc", fn);
};

Freebox.prototype.decreaseVolume = function(fn){
    this.pressKey({key: "vol_dec"}, fn);
};

Freebox.prototype.power = function(fn){
    this.pressKey("power", fn);
};

Freebox.prototype.process = function(cmd){
    this.log("process("+cmd+")");

    switch(cmd){
        case 'mute':
        case 'coupe le son':
            this.mute();
            return true;
        case 'met tf1':
            this.pressKey("1");
            return true;
        case 'met fr2':
        case 'met france2':
            this.pressKey("2");
            return true;
        case 'allumer la tv':
        case 'éteindre la tv':
            this.power();
            return true;
        case 'monter le volume':
        case 'monter le son':
        case 'monte le son':
        case 'met les watt':
            this.increaseVolume();
            return true;
        case 'baisser le volume':
        case 'baisser le son':
        case 'baisse le son':
            this.decreaseVolume();
            return true;
    }

    return false;
};
