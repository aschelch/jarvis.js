/**
 * Module dependencies.
 */
var request = require('request');

/**
 * Motion middleware
 *
 * @see https://docs.pushbullet.com/
 *
 * Examples:
 *
 *       .use(pushbullet())
 *       .use(function(bot){
 *          bot.pushbullet.pushNote("A title", "A content");
 *          bot.pushbullet.pushLink("http://www.google.fr", "A title", "A content");
 *          bot.pushbullet.pushFile(); // TODO
 *       });
 *
 */

module.exports = function(options){
    options = options || {};
    token = options.token || "";

    return function(bot){
        bot.pushbullet = bot.pushbullet || {};

        bot.pushbullet.push = function(data, fn){
            fn = fn || function(){};

            request.post({
                url : "https://api.pushbullet.com/v2/pushes",
                json: true,
                headers : {
                    "Authorization" : "Bearer "+token
                },
                body : data
            }, function(error, response, body){
                fn(error, body);
            });
        };

        bot.pushbullet.getDeviceList = function(fn){
            fn = fn || function(){};

            request({
                url : "https://api.pushbullet.com/v2/devices",
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }, function(error, response, body){
                fn(body);
            });

        }
    };
}
