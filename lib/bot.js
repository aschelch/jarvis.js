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
