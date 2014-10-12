/**
 * Module dependencies.
 */
var Imap = require('imap'),
    fs = require('fs');

/**
 * Mail
 *
 * Examples:
 *
 *       .use(mail.sender({}))
 *       .use(function(bot){
 *          bot.mail.send({});
 *       });
 *
 */

module.exports.sender = function sender(options){
    options = options || {};

    return function sender(bot){
        bot.mail = bot.mail || {};

        bot.mail.send = function(options, fn){
            fn = fn || function(err){};

            // TODO

            fn();
        }

    };
}

module.exports.receiver = function receiver(options){
    options = options || {};

    return function receiver(bot){

        var mail = [];

        imap = new Imap({
            user: options.address,
            password: options.password,
            host: 'imap.gmail.com',
            port: 993,
            tls: true
        });

        imap.once('ready', function() {

            imap.openBox('INBOX', true, function(err, box){
                if (err) throw err;

                imap.search([ 'UNSEEN', ['SINCE', '2014-07-19 23:40:00'] ], function(err, results) {
                    if (err) throw err;

                    var f = imap.fetch(results, { bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)' });

                    f.on('message', function(msg, seqno) {

                      msg.on('body', function(stream, info) {
                        var buffer = '';

                        stream.on('data', function(chunk) {
                            buffer += chunk.toString('utf8');
                        });

                        stream.once('end', function() {
                            var headers = Imap.parseHeader(buffer);
                            mail.push(headers);
                        });
                      });

                    });

                    f.once('end', function() {
                        if(mail.length > 0){
                            bot.emit("mail:receive", mail);
                        }

                        imap.end();
                    });

                  });
            });

        });

        imap.on('error', function(err){
            console.log(err);
        })

        //var check = setInterval(function(){
            imap.connect();
        //}, 30*1000);


    };
}
