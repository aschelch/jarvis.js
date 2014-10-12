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

    return function alarm(bot){
        if(!bot.sqlite) throw new Error('SQLite module not found for this bot');

        bot.alarm = bot.alarm || {};

        bot.sqlite.run('CREATE TABLE IF NOT EXISTS alarms (name TEXT, time TEXT)');

        bot.alarm.add = function(name, time){
            bot.sqlite.run('INSERT INTO alarms (name, time) VALUES (?, ?)', name, time);
        }

        // var test = setInterval(function(){
        //     var now = new Date();

        //     alarms.forEach(function(alarm){
        //         if(!alarm.run && alarm.date.getTime() <= now.getTime()){
        //             bot.emit("alarm", alarm);
        //             alarm.run = true;
        //         }
        //     });

        // }, 1000);

    };
}
