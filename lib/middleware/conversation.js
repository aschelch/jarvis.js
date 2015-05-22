/**
 * Module dependencies.
 */


/**
 * Android
 *
 * Examples:
 *
 *       .use(conversation())
 *
 */

module.exports = function(options){

    return function(bot){

        bot.hear(/^(?:salut|bonjour)/i, function(){
            bot.say(["Bonjour monsieur.", "Bonjour."]);
        });

        bot.hear(/merci/i, function(){
            bot.say(["de rien", "je vous en prie", "Ce n'est rien."]);
        });

        bot.hear(/(comment)? ?ca va \?/i, function(){
            bot.say(["très bien. Et vous ? ", "Bien", "Comme toujours"]);
        });

        bot.hear(/répète (.*)/i, function(msg, sentence){
            bot.say(sentence);
        });

        bot.hear(/quelle heure (est-il|il est) \?/i, function(){
            bot.say("Il est " + new Date().toTimeString());
        });

    }
}
