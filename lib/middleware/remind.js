/**
 * Module dependencies.
 */

/**
 * Remind
 *
 * Examples:
 *
 *       .use(remind())
 *       .use(function(bot){
 *
 *       });
 *
 */

module.exports = function(options){
    options = options || {};

    return function(bot){

        bot.hear(/rap+el+e[- ]moi dans ((?:(?:\d+) (?:heures?|minutes?|jours?))+) de (.*)/i, function(msg, time, action){
            console.log(msg);
            console.log(time);
            console.log(action);

            // TODO Get due date
            // TODO Save action

            bot.say("Je vous rapellerai de " + action + " dans "+ time);
        })

    };
}
