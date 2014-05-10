/**
 * Module dependencies.
 */


/**
 * Android
 *
 * Examples:
 *
 *       .use(android.push({appId:"1234567890"}))
 *       .use(function(bot){
 *          bot.android.push({foo:"bar"});
 *       });
 *
 */

module.exports.push = function push(options){
    return function push(bot){
        bot.android = bot.android || {};

        bot.android.push = function(data, fn){
            options = options || {};
            fn = fn || function(err){};

            // TODO
            console.log("ANDROID : push("+data+")");
            fn();
        }
    };
}
