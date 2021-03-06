/**
 * Module dependencies.
 */

var request = require('request');
var querystring = require('querystring');

/**
 * Freebox remote
 *
 * Examples:
 *
 *       .use(freebox({code:"1234"}))
 *       .use(function(bot){
 *          bot.freebox.power("1");
 *          bot.freebox.increaseVolume(function(err){});
 *          bot.freebox.pressKey("2");
 *       });
 *
 */

module.exports = function freebox(options){
    options = options || {};
    code = options.code || "";
    hd = options.hd || "hd1";
    user = options.user || "";
    pass = options.pass || "";

    return function freebox(bot){

        function pressKey(key, fn){
            fn = fn || function(err){};
            var params = {
                code: code
            };

            if(typeof key === "object"){
                params.key = key.key;
                params.long = key.long || false;
            }else{
                params.key = key;
            }

            request("http://"+hd+".freebox.fr/pub/remote_control?"+querystring.stringify(params), function(error, response, body){
                fn(error);
            });

        }

        bot.freebox = {
            pressKey: pressKey,
            mute: function(fn){
                pressKey("mute", fn);
            },
            power: function(fn){
                pressKey("power", fn);
            },
            home: function(fn){
                pressKey("home", fn);
            },
            increaseVolume: function(fn){
                pressKey("vol_inc", fn);
            },
            decreaseVolume: function(fn){
                pressKey("vol_dec", fn);
            },
            nextChannel: function(fn){
                pressKey("prgm_inc", fn);
            },
            previousChannel: function(fn){
                pressKey("prgm_dec", fn);
            },
            isOn: function(){
                return false;
            },
            sendSms: function(msg, fn){
                fn = fn || function(err){};

                request("https://smsapi.free-mobile.fr/sendmsg?"+querystring.stringify({user: user, pass: pass, msg: msg}), {rejectUnauthorized:false}, function(error, response, body){
                    fn(error);
                });
            }
        }
    };
}
