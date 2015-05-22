/**
 * Module dependencies.
 */

var request = require('request');
var querystring = require('querystring');

/**
 * Light control
 *
 * Examples:
 *
 *       .use(light({}))
 *       .use(function(bot){
 *          bot.light.on();
 *          bot.light.off();
 *       });
 *
 */

module.exports = function light(options){
    options = options || {};

    return function light(bot){

        bot.light = {
            on: function(){
                // TODO
                return false;
            },
            off: function(){
                // TODO
                return false;
            }
        }
    };
}
