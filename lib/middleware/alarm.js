/**
 * Module dependencies.
 */

/**
 * Alarm
 *
 * Examples:
 *
 *       .use(alarm({}))
 *       .use(function(bot){
 *          bot.on('alarm', function(alarm){
 *              console.log(alarm);
 *          });
 *       });
 *
 */

module.exports = function alarm(options){
    options = options || {};
    alarms = [];

    const TABLE = "alarms";

    const COLUMN_ID = "id";
    const COLUMN_NAME = "name";
    const COLUMN_TIME = "time";
    const COLUMN_ENABLED = "enabled";

    return function alarm(bot){
        if(!bot.sqlite) throw new Error('SQLite module not found for this bot');

        bot.alarm = bot.alarm || {};

        bot.sqlite.run("CREATE TABLE IF NOT EXISTS " + TABLE + " (" + COLUMN_ID + " INTEGER PRIMARY KEY, " + COLUMN_NAME + " TEXT, " + COLUMN_TIME + " TEXT, " + COLUMN_ENABLED + " BOOLEAN)");

        bot.alarm.add = function(name, time){
            bot.sqlite.run("INSERT INTO " + TABLE + " (" + COLUMN_NAME + ", " + COLUMN_TIME + ", " + COLUMN_ENABLED + ") VALUES (?, ?, 1)", name, time);
        }

        bot.alarm.enable = function(id){
            bot.sqlite.run("UPDATE " + TABLE + " SET " + COLUMN_ENABLED + " = 1 WHERE " + COLUMN_ID + " = ?", id);
        }

        bot.alarm.disable = function(id){
            bot.sqlite.run("UPDATE " + TABLE + " SET " + COLUMN_ENABLED + " = 0 WHERE " + COLUMN_ID + " = ?", id);
        }

        bot.alarm.remove = function(id){
            bot.sqlite.run("DELETE FROM " + TABLE + " WHERE " + COLUMN_ID + " = ?", id);
        }

        bot.alarm.list = function(fn){
            bot.sqlite.each("SELECT * FROM " + TABLE + " WHERE 1=1", fn);
        }

        var test = setInterval(function(){
            var now = new Date();

            bot.sqlite.each("SELECT * FROM " + TABLE + " WHERE " + COLUMN_ENABLED + " = 1", function(err, alarm) {
                if(err){
                    console.log(err);
                    return;
                }

                if(alarm.time === now.toTimeString().split(' ')[0]){
                    bot.emit("alarm", alarm);
                }

            });

        }, 1000);

    };
}
