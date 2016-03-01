/**
 * Module dependencies.
 */

var exec = require('child_process').exec;
var util = require('util');

/**
 * Tts (Text-to-speech)
 *
 * Examples:
 *
 *       .use(tts({voice:"Loic"}))
 *       .use(function(bot){
 *          bot.tts.say("Hello world");
 *          bot.tts.say(["Hello", "world"]); // choose a sentence randomly
 *       });
 *
 */

module.exports = function tts(options){
    options = options || {};
    key = options.key || '';
    language = options.language || 'fr-fr';
    volume = options.volume || 75;

    return function tts(bot){
        bot.tts = {
            say: function(text, opt, fn){
                opt = opt || options;
                vol = opt.volume || volume;
                fn = fn || function(err){};

                if(util.isArray(text)){
                    text = text[Math.floor(Math.random() * text.length)];
                }

                exec('mpg321 -q -g '+vol+' "http://api.voicerss.org/?key='+key+'&hl='+language+'&src='+encodeURIComponent(text)+'"', function (error, stdout, stderr) {
                    fn(error);
                });
            }
        }
    };
}
