/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var util = require('util');

/**
 * Wifi device detection
 *
 * Examples:
 *
 *       .use(detection())
 *       .use(function(bot){
 *
 *          bot.on("detection:wifi:detected", function(mac){
 *              console.log("New device detected (" + mac + ")")
 *          });
 *
 *          bot.on("detection:wifi:lost", function(mac){
 *              console.log("A device left (" + mac + ")")
 *          });
 *
 *       });
 *
 */

module.exports = function detection(options){
    options = options || {};
    broadcastIp = options.broadcastIp || '192.168.1.255';

    macAdresses = [];

    checkPresence = function(bot, sendEvent){
        exec('ping -c 1 ' + broadcastIp + ' && arp -a', function (error, stdout, stderr) {
            lines = stdout.split("\n");

            newMacAdresses = [];
            for(var line in lines){
                match = lines[line].match(/[0-9a-z]{1,2}\:[0-9a-z]{1,2}\:[0-9a-z]{1,2}\:[0-9a-z]{1,2}\:[0-9a-z]{1,2}\:[0-9a-z]{1,2}/);
                if(match !== null){
                    newMacAdresses.push(match[0]);
                }
            }

            if(sendEvent){

                arrived = [];
                left = [];

                for(var d in newMacAdresses){
                    if(macAdresses.indexOf(newMacAdresses[d]) === -1){
                        arrived.push(newMacAdresses[d]);
                    }
                }

                for(var d in macAdresses){
                    if(newMacAdresses.indexOf(macAdresses[d]) === -1){
                        left.push(macAdresses[d]);
                    }
                }

                for(var d in arrived){
                    bot.emit("detection:wifi:detected", arrived[d]);
                }
                for(var d in left){
                    bot.emit("detection:wifi:lost", left[d]);
                }

            }

            macAdresses = newMacAdresses;

        });
    }

    return function presence(bot){

        bot.presence = {
            isPresent : function(mac){
                for(var d in macAdresses){
                    if(mac == newMacAdresses[d]){
                        return true;
                    }
                }
                return false;
            },
            list: function(){
                return macAdresses;
            }
        };

        checkPresence(bot, false);
        var test = setInterval(function(){
            checkPresence(bot, true);
        }, 30000);

    };
}
