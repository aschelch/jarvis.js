/**
 * Module dependencies.
 */
var serialport = require("serialport");

/**
 * SerialPort
 *
 * Examples:
 *
 *
 *
 */

module.exports = function serial(options){
    options = options || {};
    path = options.path || '';
    baudrate = options.baudrate || 9600;

    serialPort = new serialport.SerialPort(path, {
      baudrate: baudrate,
      parser: serialport.parsers.readline("\n")
    });

    return function serial(bot){
        bot.serialport = bot.serialport || {};

        bot.serialport.write = serialPort.write;


        serialPort.open(function (error) {
            if ( error ) {
                console.log('failed to open serialport: '+error);
                return;
            } else {
                serialPort.on('data', function(text) {
                    var data = JSON.parse(text)

                    if(typeof(lastTimeDataReceived[data[0].value]) == "undefined" || ((new Date()).getTime() - lastTimeDataReceived[data[0].value]) > 2000){

                        bot.emit('serial', data);
                        lastTimeDataReceived[data[0].value] = (new Date()).getTime();

                    }
                });
            }
        });
    };
}
