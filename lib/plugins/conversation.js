var util = require('util');
var Plugin = require('../plugin');

exports = module.exports = Conversation;

function Conversation(app, options){
    options = options || {};

    Plugin.call(this, app, options);

    this.name = "conversation"
};

util.inherits(Conversation, Plugin);

Conversation.prototype.process = function(cmd){
    this.log("process("+cmd+")");
    switch(cmd){
        case 'merci':
            tts.say(["De rien", "Je vous en prie"]);
            return true;
        case 'ping':
            tts.say(["Pongue"]);
            return true;
    }

    return false;
};
