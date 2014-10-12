/**
 * Module dependencies.
 */
var Speakable = require('speakable');

/**
 * Voice recognition
 *
 * Examples:
 *
 *       .use(voice-recognition())
 *       .use(function(bot){
 *
 *       });
 *
 */

module.exports = function recognition(options){
    options = options || {};

    speakable = new Speakable({
        lang: options.lang,
        key: options.key
    });

    return function recognition(bot){

        bot.stopListening = function(){
            // TODO
        };

        bot.startListening = function(){
            speakable.recordVoice();
        };

        speakable.on('error', function(err) {

            console.log('onError:');
            console.log(err);

            speakable.recordVoice();
        });

        speakable.on('speechResult', function(recognizedWords) {

            bot.emit("message", recognizedWords);

            speakable.recordVoice();
        });

        speakable.recordVoice();


    };
}
