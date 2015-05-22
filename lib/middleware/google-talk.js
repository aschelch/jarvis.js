/**
 * Module dependencies.
 */

var xmpp = require('node-xmpp');

/**
 * Terminal
 *
 * Examples:
 *
 *       .use(googletalk({}))
 *       .use(function(bot){
 *
 *          bot.on('message', function(message){
 *              console.log(message);
 *          })
 *
 *          bot.googletalk.send(to, message);
 *
 *       });
 *
 */

module.exports = function googletalk(options){
    options = options || {};

    return function googletalk(bot){

        client = new xmpp.Client(options);

        client.connection.socket.setTimeout(0);
        client.connection.socket.setKeepAlive(true, 10000);

        bot.googletalk = {};
        bot.googletalk.presence = function(status){
            var presence_elem = new xmpp.Element('presence', {})
                                   .c('show').t('chat').up()
                                   .c('status').t(status);
            client.send(presence_elem);
        };
        bot.googletalk.send = function(recipient, message){
            var elem = new xmpp.Element('message', { to: recipient, type: 'chat' })
                .c('body').t(message);
            client.send(elem);
        };
        bot.googletalk.roster = function() {
            var query = new xmpp.Element('iq', {
                type: 'get',
                id: (new Date()).getTime()
            })
            .c('query', { xmlns: 'jabber:iq:roster' });

            client.send(query);
        };

        client.on('online', function() {
            bot.googletalk.presence("Disponible");
        });

        client.on('online', function() {
            var roster_elem = new xmpp.Element('iq', { from: client.jid, type: 'get', id: 'google-roster'})
                                .c('query', { xmlns: 'jabber:iq:roster', 'xmlns:gr': 'google:roster', 'gr:ext': '2' });
            client.send(roster_elem);
        });

        client.on('stanza', function(stanza) {
            if(stanza.is('presence') && stanza.attrs.type === 'subscribe') {
                var subscribe_elem = new xmpp.Element('presence', {
                    to: stanza.attrs.from,
                    type: 'subscribed'
                });
                client.send(subscribe_elem);
            }
        });

        client.on('stanza', function message_dispatcher(stanza) {
            if(stanza.is('message') && 'error' !== stanza.attrs.type) {
                message = stanza.getChildText('body');
                if(null !== message){
                    bot.emit("message", stanza.getChildText('body'));
                }
            }
        });

    };
}
