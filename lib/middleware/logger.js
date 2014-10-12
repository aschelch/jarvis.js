/**
 * Module dependencies.
 */

/**
 * Logger middleware
 *
 * Examples:
 *
 *       .use(logger())
 *       .use(function(bot){
 *          bot.log('a string');
 *       });
 *
 */

module.exports = function sqlite(options){
    options = options || {};

    return function sqlite(bot){
        if(!bot.sqlite) throw new Error('SQLite module not found for this bot');

        bot.sqlite.run('CREATE TABLE IF NOT EXISTS logs (text TEXT, timestamp INTEGER)');

        bot.log = function(string){
            bot.sqlite.run('INSERT INTO logs (text, timestamp) VALUES (?, ?)', string, new Date());
        }
    };
}
