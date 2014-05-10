/**
 * Module dependencies.
 */

/**
 * IRC
 *
 * Examples:
 *
 *       .use(irc({}))
 *       .use(function(bot){
 *          bot.irc.say("Hello world");
 *       });
 *
 */

module.exports = function irc(options){
    options = options || {};

    return function irc(bot){
        bot.irc = {
            say: function(text, fn){
                fn = fn || function(err){};

                // TODO

                fn();
            }
        }
    };
}
