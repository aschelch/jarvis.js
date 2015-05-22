/**
 * Module dependencies.
 */
var Twilio = require('twilio');

/**
 * Voice recognition
 *
 * Examples:
 *
 *       .use(sms({
 *           account: "",
 *           token: ""
 *       }))
 *       .use(function(bot){
 *           bot.on("sms:receive", function(sms){
 *               // TODO Do something
 *           })
 *       });
 *
 */

module.exports = function sms(options){
    options = options || {};

    twilio = new Twilio(
        options.account,
        options.token
    );

    return function sms(bot){
        bot.sms = bot.sms || {};
        bot.sms.send = function(sms, fn){
            twilio.sendMessage(sms, fn);
        };

        //bot.emit("sms:receive", sms);

    };
}
