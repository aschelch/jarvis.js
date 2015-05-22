/**
 * Module dependencies.
 */


/**
 * Motion middleware
 *
 * @see https://pushover.net/
 *
 * Examples:
 *
 *       .use(pushover())
 *       .use(function(bot){
 *          bot.pushover.push('somedata');
 *       });
 *
 */

module.exports = function(options){
    options = options || {};

    return function(bot){
        bot.pushover = bot.pushover || {};
        bot.pushover.push = function(){
            //TODO
        }

    };
}
