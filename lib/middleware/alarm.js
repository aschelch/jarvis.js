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

        bot.addAlarm = function(date, obj){
            alarms.push({date:date, obj:obj, run:false});
        }

        var test = setInterval(function(){
            var now = new Date();

            alarms.forEach(function(alarm){
                if(!alarm.run && alarm.date.getTime() <= now.getTime()){
                    bot.emit("alarm", alarm);
                    alarm.run = true;
                }
            });

        }, 1000);

    };
}
