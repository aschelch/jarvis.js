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
var presence   = require('./lib/middleware/wifi-device-detection');
var sms      = require('./lib/middleware/twilio');
var conversation  = require('./lib/middleware/conversation');
var googletalk = require('./lib/middleware/google-talk');
var remind = require('./lib/middleware/remind');
var webapp = require('./lib/middleware/webapp');
var serialport = require('./lib/middleware/serial-port');
var pushbullet = require('./lib/middleware/pushbullet');
var pushover = require('./lib/middleware/pushover');
var motion = require('./lib/middleware/motion');


var config   = require('./config.json');

jarvis()
    .set("name", "Jarvis")
    .set("version", "1.0.0")

    // Load middlewares
    .use(sqlite())
    .use(logger())
    .use(sms({
        account: config.sms.account,
        token: config.sms.token
    }))

    //.use(irc({server:"irc.test.com",port:9999})) // chat on irc
    //.use(mail.sender({})) // send mail
    .use(alarm())
    .use(t411({
        username: config.t411.username,
        password: config.t411.password
    }))
/*
    .use(googletalk({
        "jid": config.mail.address,
        "password": config.mail.password,
        "host": "talk.google.com",
        "port": 5222,
        "reconnect": true
    }))
*/

    // Add device presence detector using Wifi
    .use(presence({
        broadcastIp : '192.168.0.255'
    }))
/*
    .use(serialport({
        path: '/dev/tty.usbmodem1411',
        baudrate: 9600
    }))
*/
    .use(remind())
/*
    .use(mail.receiver({
        address: config.mail.address,
        password: config.mail.password
    })) // receive mail
*/
    .use(terminal({prompt:"question> "})) // receive mail
    .use(freebox({
        code: config.freebox.code,
        user: config.freebox.user,
        pass: config.freebox.pass,
    })) // control freebox

    .use(tts({ // output with tts
        voice: config.tts.voice,
        volume: 100
    }))

    .use(weather({units:"metric", lang:"fr"})) // get weather

    .use(android.push({app_id:"1324"})) // send push notification to android

    .use(conversation())
    .use(motion())
    .use(pushbullet({
        token: config.pushbullet.token
    }))
    .use(pushover())

    /*
    .use(voice_recognition({
        key : config.voice_recognition.key,
        lang: config.voice_recognition.lang
    }))
*/

    .use(function(bot){
        // add function say that use tts with different volume according to the time
        bot.say = function(text, fn){
            fn = fn || function(err){};

            //bot.stopListening();

            var now = new Date();
            if(7 <= now.getHours() && now.getHours() <= 23){
                bot.tts.say(text, fn);
            }else{
                bot.tts.say(text, {volume:50}, fn);
            }

            //bot.startListening();
        }
    })

    // Webserver using express
    .use(webapp())

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

        bot.on("message", function(message){
            if(message.indexOf("envoi") > -1 && message.indexOf("lien") > -1 && message.indexOf("S5") > -1){

                bot.pushbullet.push({
                    type: "link",
                    url: "http://www.google.fr",
                    title:"A title",
                    body: "A content",
                    device_iden: "ujC352QuqhosjAoIRwhIL6" // S5
                    //device_iden: "ujC352QuqhodjAiVsKnSTs" // Chrome
                }, function(err, result){
                    bot.say("J'ai envoyé le lien sur votre S5");
                });
            }
        });


        bot.on("message", function(message){
            if(message.indexOf("alarm") > -1){

                id = message.match(/[0-9]+/);
                if(id){
                    id = id[0];
                }


                if(message.indexOf("ajout") > -1){

                    time = message.match(/([0-9]{2}):([0-9]{2}):([0-9]{2})/);
                    if(time){
                        time = time[0];

                        bot.alarm.add("Alarme", time);
                    }else{
                        bot.tts.say("A quelle heure ?");
                    }

                }else if(message.indexOf("supprim") > -1){
                    bot.alarm.remove(id);
                }else if(message.indexOf("desactiv") > -1){
                    bot.alarm.disable(id);
                }else if(message.indexOf("activ") > -1){
                    bot.alarm.enable(id);
                }else if(message.indexOf("list") > -1){
                    bot.alarm.list(function(err, alarm){
                        console.log(alarm);
                    });
                }
            }
        });

        // Say hello when we start
        bot.tts.say("Bonjour monsieur.");

        // Send a SMS
        //bot.freebox.sendSms("Quelqu'un a ouvert la porte de l'appartement alors que vous n'êtes pas là !");


        bot.on("alarm", function(alarm){
            bot.say("monsieur, il est 8h.");

            if(alarm.id == 1){
                bot.freebox.pressKey("power");
                setInterval(function(){
                    bot.freebox.pressKey("ok");
                    bot.freebox.pressKey("1");
                    bot.freebox.pressKey("5");
                }, 20000);
            }
        });

        // When the bot receive a mail
        bot.on("mail:receive", function(mail){

            bot.say("J'ai reçu "+mail.length+" mail");

        });


        bot.on("message", function(message){
            if(message.indexOf("wifi") > -1 && message.indexOf("list") > -1){
                console.log(bot.presence.list());
            }
        });

        // When a new device is detected on the Wifi network
        bot.on("detection:wifi:detected", function(mac){
            console.log("WIFI DEVICE DETECTED : " + mac);
            if(mac == config.device.smartphone.mac){
                bot.say("Bonjour Aurélien.");
            }
        });

        bot.on("detection:wifi:lost", function(mac){
            console.log("WIFI DEVICE LOST : " + mac);

            if(mac == config.device.smartphone.mac){
                // I left home
                // Put the light off, ...
            }
        });


        bot.on("message", function(message){
            if(message.indexOf("ping") > -1){
                bot.say("Pongue");
            }
        });

        bot.on("message", function(message){
            if(message.indexOf("reboot") > -1){
                process.exit(0);
            }
        });


        bot.on("message", function(message){
            if((message.indexOf("éteindre") > -1 || message.indexOf("allumer") > -1 ) && (message.indexOf("télé") > -1 || message.indexOf("tv") > -1)){
                bot.freebox.pressKey("power");
                setInterval(function(){
                    bot.freebox.pressKey("ok");
                    bot.freebox.pressKey("1");
                }, 20000);
            }
        });

        bot.on("message", function(message){

            bot.log(message);

            if(message.indexOf("mute") > -1){
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

        // bot.on("message", function(){
        //     bot.say(["Je ne suis pas sûr de comprendre", "Je ne sais pas quoi dire"]);
        // });
    });
