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
    voice = options.voice || "Loic";

    return function tts(bot){
        bot.tts = {
            say: function(text, fn){
                fn = fn || function(err){};

                if(util.isArray(text)){
                    text = text[Math.floor(Math.random() * text.length)];
                }

                exec('mpg321 "http://voxygen.fr/sites/all/modules/voxygen_voices/assets/proxy/index.php?method=redirect&voice='+voice+'&ts=1399315146158&text='+encodeURIComponent(text)+'"', function (error, stdout, stderr) {
                    fn(error);
                });
            }
        }
    };
}
