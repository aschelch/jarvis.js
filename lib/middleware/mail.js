/**
 * Module dependencies.
 */


/**
 * Mail
 *
 * Examples:
 *
 *       .use(mail.sender({}))
 *       .use(function(bot){
 *          bot.mail.send({});
 *       });
 *
 */

module.exports.sender = function sender(options){
    options = options || {};

    return function sender(bot){
        bot.mail = bot.mail || {};

        bot.mail.send = function(options, fn){
            fn = fn || function(err){};

            // TODO

            fn();
        }

    };
}

module.exports.receiver = function receiver(options){
    options = options || {};

    return function receiver(bot){

        // TODO
        var mail = {};

        bot.emit("mail:receive", mail);

    };
}
