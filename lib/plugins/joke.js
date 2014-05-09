var util = require('util');
var Plugin = require('../plugin');

exports = module.exports = Joke;

function Joke(app, options){
    options = options || {};

    Plugin.call(this, app, options);

    this.name = "joke";
};

util.inherits(Joke, Plugin);

Joke.prototype.start = function(){
    this.log("start");
    this.voice = this.app.getPlugin('voice');
};

Joke.prototype.process = function(cmd){
    this.log("process("+cmd+")");
    switch(cmd){
        case 'raconte-moi une blague':
            this.voice.say("Je ne connais aucune blagues");
            return true;
    }

    return false;
};
