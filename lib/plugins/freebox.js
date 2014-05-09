var util = require('util');
var Plugin = require('../plugin');

var request = require('request');
var querystring = require('querystring');

exports = module.exports = Freebox;

function Freebox(app, options){
    options = options || {};

    Plugin.call(this, app, options);

    this.name = "freebox"
};

util.inherits(Freebox, Plugin);

Freebox.prototype.foo = function() {
    this.log("foo");
};

Freebox.prototype.bar = function() {
    this.log("bar");
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


function pressKey(key, fn){
    fn = fn || function(err){};

    var params = {
        code: code
    };

    if(typeof key === "string"){
        params.key = key;
    }else if(typeof key === "object"){
        params.key = key.key;
        params.long = key.long || false;
    }

    request("http://hd1.freebox.fr/pub/remote_control?"+querystring.stringify(params), function(error, response, body){
        fn(error);
    });

};

function nextChannel(fn){
    pressKey("prgm_inc", fn);
};

function previousChannel(fn){
    this.pressKey("prgm_dec", fn);
};

function home(fn){
    this.pressKey("home", fn);
};

function mute(fn){
    this.pressKey("mute", fn);
};

function increaseVolume(fn){
    this.pressKey("vol_inc", fn);
};

function decreaseVolume(fn){
    this.pressKey({key: "vol_dec"}, fn);
};

function power(fn){
    this.pressKey("power", fn);
};
