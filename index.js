/**
 * Module dependencies.
 */

var jarvis   = require('./lib/jarvis');

var freebox  = require('./lib/middleware/freebox');
var tts      = require('./lib/middleware/tts');
var android  = require('./lib/middleware/android');
var mail     = require('./lib/middleware/mail');
var irc      = require('./lib/middleware/irc');
var weather  = require('./lib/middleware/weather');
var terminal = require('./lib/middleware/terminal');
var alarm    = require('./lib/middleware/alarm');
var t411     = require('./lib/middleware/t411');
var sqlite   = require('./lib/middleware/sqlite');
var logger   = require('./lib/middleware/logger');
var voice_recognition   = require('./lib/middleware/voice-recognition');

var config   = require('./config.json');

jarvis()
    .set("name", "jarviss")

    // Load middlewares
    .use(sqlite())

    .use(logger())

    //.use(irc({server:"irc.test.com",port:9999})) // chat on irc

    //.use(mail.sender({})) // send mail
    .use(alarm())
    .use(t411({
        username: config.t411.username,
        password: config.t411.password
    }))

    //.use(presence())

    .use(mail.receiver({
        address: config.mail.address,
        password: config.mail.password
    })) // receive mail
    .use(terminal({prompt:"question> "})) // receive mail
    .use(freebox({code: config.freebox.code})) // control freebox

    .use(tts({ // output with tts
        voice: config.tts.voice,
        volume: 100
    }))

    .use(weather({units:"metric", lang:"fr"})) // get weather

    .use(android.push({app_id:"1324"})) // send push notification to android

    .use(voice_recognition({
        key : config.voice_recognition.key,
        lang: config.voice_recognition.lang
    }))

    .use(function(bot){
        // add function say that use tts with different volume according to the time
        bot.say = function(text, fn){
            fn = fn || function(err){};

            bot.stopListening();

            var now = new Date();
            if(7 <= now.getHours() && now.getHours() <= 23){
                bot.tts.say(text, fn);
            }else{
                bot.tts.say(text, {volume:50}, fn);
            }

            bot.startListening();
        }
    })

    // // TVShow torrent download example
    // .use(function(bot){

    //     var check = setInterval(function(){
    //         bot.t411.search('the blacklist S01E05', function(err, res){
    //             if(res && res.total > 0){

    //                 bot.t411.download(res.torrents[0].id, function(err, res){
    //                     if(err) {console.log(err);}
    //                     bot.say("Monsieur. Le 5ième épisode de The Blacklist est disponible. ");
    //                 });

    //                 clearInterval(check);
    //             }
    //         });
    //     }, 1*1000);

    // })
    .use(function brain(bot){

        // Say hello when we start
        bot.tts.say("Bonjour monsieur.");

        bot.alarm.add("Réveil", "08:00");

        bot.on("alarm", function(alarm){
            bot.say("monsieur, il est 8h.");
        });

        // When the bot receive a mail
        bot.on("mail:receive", function(mail){

            bot.say("J'ai reçu "+mail.length+" mail");

        });


        bot.on("message", function(message){
            if(message.indexOf("ping") > -1){
                bot.say("Pong");
            }
        });

        bot.on("message", function(message){

            bot.log(message);

            if(message.indexOf("salut") > -1 || message.indexOf("bonjour") > -1 ){
                bot.say(["Bonjour monsieur.", "Bonjour."]);
            }else if(message.indexOf("merci") > -1){
                bot.say(["de rien", "je vous en prie", "Ce n'est rien."]);
            }else if(message.indexOf("mute") > -1){
                bot.freebox.mute();
            }else if(message.indexOf("tf1") > -1){
                bot.freebox.pressKey("1");
            }else if(message.indexOf("fr2") > -1 || message.indexOf("france2") > -1){
                bot.freebox.pressKey("2");
            }else if(message.indexOf("d8") > -1){
                bot.freebox.pressKey("8");
            }else if(message.indexOf("hd1") > -1){
                bot.freebox.pressKey("2");
                bot.freebox.pressKey("0");

            }else if(message.indexOf("météo") > -1){
                if(message.indexOf("aujourd'hui") > -1){
                    bot.weather.current({q:"Macon,fr"}, function(err, data){
                        if(err){
                            bot.say("Désolé monsieur. je n'ai pas réussi à récupérer la météo d'aujourd'hui.");
                            return;
                        }
                        bot.say("Voici la météo d'aujourd'hui");
                        console.log(data);
                    });
                }else if(message.indexOf("semaine") > -1){
                    bot.weather.daily({q:"Macon,fr"}, function(err, data){
                        if(err){
                            bot.say("Désolé monsieur. je n'ai pas réussi à récupérer la météo de la semaine.");
                            return;
                        }
                        bot.say("Voici la météo de la semaine");
                        console.log(data);
                    });
                }
            }

        });
    });
