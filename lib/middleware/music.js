/**
 * Module dependencies.
 */


/**
 * Music middleware
 *
 * Examples:
 *
 *       .use(music())
 *       .use(function(bot){
 *          bot.music.play();
 *
 *          bot.music.stop();
 *       });
 *
 */

module.exports = function music(options){
    options = options || {};
    folder = options.folder || 'music';

    return function(bot){
        bot.music = bot.music || {};

        bot.music.play = function(){};
        bot.music.pause = function(){};
        bot.music.stop = function(){};
    };
}
