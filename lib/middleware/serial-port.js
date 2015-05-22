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
                console.log('failed to open: '+error);
                return;
            } else {

                console.log('open');

                serialPort.on('data', function(data) {
                    console.log('data received: ' + data);
                    bot.emit('serial', data);
                });
            }
        });
    };
}
