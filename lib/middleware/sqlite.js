/**
 * Module dependencies.
 */
var sqlite3 = require('sqlite3');


/**
 * SQLite middleware
 *
 * Examples:
 *
 *       .use(sqlite())
 *       .use(function(bot){
 *          bot.sqlite.run('INSERT INTO ...');
 *       });
 *
 */

module.exports = function sqlite(options){
    options = options || {};
    filepath = options.filepath || 'data/database.sqlite';

    return function sqlite(bot){
        bot.sqlite = new sqlite3.Database(filepath);
    };
}
