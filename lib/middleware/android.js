/**
 * Module dependencies.
 */
var gcm = require('node-gcm');

/**
 * Android
 *
 * Examples:
 *
 *       .use(android.push({appId:"1234567890"}))
 *       .use(function(bot){
 *          bot.android.push({foo:"bar"}, ["aaaaaaaaaaa"]);
 *       });
 *
 */

module.exports.push = function push(options){
    options = options || {};
    appId = options.appId || '';

    sender = new gcm.Sender(appId);

    return function push(bot){

        bot.android = bot.android || {};
        bot.android.push = function(data, device, fn){
            fn = fn || function(err, result){};

            var message = new gcm.Message();
            message.addDataWithObject(data);

            sender.send(message, device, 4, fn);
        }

    };
}
