/**
 * Module dependencies.
 */

var jarvis = require('./lib/jarvis');

var freebox = require('./lib/middleware/freebox');
var tts = require('./lib/middleware/tts');
var android = require('./lib/middleware/android');
var mail = require('./lib/middleware/mail');
var irc = require('./lib/middleware/irc');
var weather = require('./lib/middleware/weather');
var terminal = require('./lib/middleware/terminal');
var alarm = require('./lib/middleware/alarm');
var t411 = require('./lib/middleware/t411');

var config = require('./config.json');

jarvis()
    .set("name", "Jarviss")

    .use(irc({server:"irc.test.com",port:9999})) // chat on irc
    .use(mail.sender({})) // send mail
    .use(alarm())
    .use(t411({
        username: config.t411.username,
        password: config.t411.password
    }))
    //.use(presence())
    .use(mail.receiver({})) // receive mail
    .use(terminal({prompt:"question> "})) // receive mail
    .use(freebox({code:"1234"})) // control freebox
    .use(tts({voice:"Loic"})) // output with tts
    .use(weather({units:"metric", lang:"fr"})) // get weather
    .use(android.push({app_id:"1324"})) // send push notification to android


    .use(function(bot){
        // add function say that use tts the day, and console log the night
        bot.say = function(text, fn){
            fn = fn || function(err){};

            var now = new Date();
            if(7 <= now.getHours() && now.getHours() <= 23){
                bot.tts.say(text, fn);
            }else{
                console.log(text);
                fn();
            }
        }
    })

    .use(function(bot){

        setInterval(function(){
            bot.t411.search('silicon valley S01E06', function(err, torrents){
                console.log(torrents);
                if(torrents && torrents.total > 0){
                    bot.say("Monsieur. Le nouvel épisode de Silicon Valley est disponible");
                }
            });
        }, 2*60*1000);

    })

    .use(function brain(bot){

        // Say hello when we start
        bot.tts.say("Bonjour monsieur.");

        bot.on("alarm", function(alarm){
            bot.say("monsieur, il est 8h.");
        });

        // When we receive a mail
        bot.on("mail:receive", function(mail){
            bot.say("monsieur, vous venez de recevoir un mail.");
        });

        bot.on("terminal:message", function(message){

            if(message.indexOf("salut") > -1 || message.indexOf("bonjour") > -1 ){
                bot.say(["Bonjour monsieur.", "Bonjour."]);
            }else if(message.indexOf("merci") > -1){
                bot.say(["de rien", "je vous en prie", "Ce n'est rien."]);
            }else if(message.indexOf("météo") > -1){
                if(message.indexOf("aujourd'hui") > -1){
                    bot.weather.current({q:"Macon,fr"}, function(err, data){
                        if(err){
                            bot.say("Désolé monsieur. je n'ai pas réussi à récupérer la météo d'aujourd'hui.");
                            return;
                        }
                        bot.say("Voici la météo d'aujourd'hui");
                    });
                }else if(message.indexOf("semaine") > -1){
                    bot.weather.daily({q:"Macon,fr"}, function(err, data){
                        if(err){
                            bot.say("Désolé monsieur. je n'ai pas réussi à récupérer la météo de la semaine.");
                            return;
                        }
                        bot.say("Voici la météo de la semaine");
                    });
                }
            }

        });
    });
