var util = require('util');
var Plugin = require('../plugin');

var tts = require('tts');

exports = module.exports = Voice;

function Voice(jarvis, options){
    options = options || {};

    Plugin.call(this, jarvis, options);

    this.name = "voice"
    this.tts = tts({
        voice: options.voice || "Loic"
    });
};

util.inherits(Voice, Plugin);

Voice.prototype.say = function(sentence) {
    this.log("say("+sentence+")");
    this.tts.say(sentence);
};

Voice.prototype.process = function(cmd){
    this.log("process("+cmd+")");
};
