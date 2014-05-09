var util = require('util');
var Plugin = require('../plugin');

exports = module.exports = Conversation;

function Conversation(jarvis, options){
    options = options || {};

    Plugin.call(this, jarvis, options);

    this.name = "conversation"
};

util.inherits(Conversation, Plugin);

Conversation.prototype.start = function(){
    this.log("start");
    this.voice = this.jarvis.getPlugin('voice');
};

Conversation.prototype.process = function(cmd){
    this.log("process("+cmd+")");
    switch(cmd){
        case 'salut':
        case 'yo':
        case 'bonjour':
            this.voice.say(["Bonjour monsieur", "Bonjour"]);
            return true;
        case 'merci':
            this.voice.say(["De rien", "Je vous en prie"]);
            return true;
        case 'ping':
            this.voice.say(["Pongue"]);
            return true;
    }

    return false;
};
