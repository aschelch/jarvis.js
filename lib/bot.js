/**
 * Module dependencies.
 */



/**
 * Bot prototype.
 */

var bot = exports = module.exports = {};

/**
 * Initialize the bot
 */

bot.init = function(){
  this.settings = {};
};

/**
 *
 */

bot.use = function(fn){
    fn = fn || function(bot){};
    fn(this);
    return this;
}

/**
 *
 */

bot.set = function(setting, value){
    if (1 == arguments.length) {
        return this.settings[setting];
    }
    this.settings[setting] = value;
    return this;
}


bot.hear = function(regex, fn){
    fn = fn || function(bot){};
    this.on('message', function(message){
        match = message.match(regex);
        if(match) {
            console.log(match);
            delete match["index"];
            delete match["input"];
            fn.apply(null, match);
        }
    });
    return this;
}
