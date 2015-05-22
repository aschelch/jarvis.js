/**
 * Module dependencies.
 */

/**
 * Presence detection
 *
 * Examples:
 *
 *       .use(presence())
 *       .use(function(bot){
 *
 *       });
 *
 */

module.exports = function detection(options){
    options = options || {};

    return function detection(bot){

        user = {
            id: 1,
            firstname: "John",
            lastname: "Dao"
        }

        bot.on("presence:wifi:detected", function(mac){
            if(mac == "FF:FF:FF:FF:FF:FF"){
                bot.emit("presence:arrived", user);
            }
        });


        bot.on("presence:wifi:lost", function(mac){
            if(mac == "FF:FF:FF:FF:FF:FF"){
                bot.emit("presence:left", user);
            }
        });

    };
}
