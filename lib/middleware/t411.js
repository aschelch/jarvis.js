/**
 * Module dependencies.
 */

var request = require('request'),
    fs = require('fs');

/**
 * t411 client
 *
 * Examples:
 *
 *       .use(t411({}))
 *       .use(function(bot){
 *          bot.t411.search({q:"big bang theory"}, function(err, result){
 *              console.log(result);
 *          });
 *       });
 *
 */

 var apiUrl = 'http://api.t411.me';

module.exports = function t411(options){
    options = options || {};
    var username = options.username || "";
    var password = options.password || "";
    var torrentFolder = options.torrentFolder || "torrents";

    var self = this;

    function getToken(fn){
        if(self.token){
            return fn(null, self.token);
        }

        request({
            url : apiUrl + '/auth',
            method : 'POST',
            form : {
                'username' : username,
                'password' : password
            }
        }, function(err, response, body){
            if(err) return fn(err);

            var json = JSON.parse(body);
            if(json.token){
                self.token = json.token;
                return fn(null, token);
            }

            return fn(new Error(json));
        });

    }

    return function t411(bot){
        bot.t411 = {
            search : function(term, fn){
                fn = fn || function(err, results){};

                getToken(function(err, token){
                    if(err) return fn(err);

                    var options = {
                        url : apiUrl + '/torrents/search/' + term,
                        headers : { "Authorization" : token }
                    };

                    request(options, function(err, response, body){
                        if(err){return fn(err);}

                        fn(null, JSON.parse(body));
                    });

                });
            },
            download: function(id, fn){
                fn = fn || function(err, results){};

                getToken(function(err, token){
                    if(err) return fn(err);

                    var options = {
                        url : apiUrl + '/torrents/download/' + id,
                        headers : { "Authorization" : token },
                        encoding: 'binary'
                    };

                    request(options, function(err, response, body){
                        if(err){return fn(err);}
                        fs.writeFile(torrentFolder+'/'+id+'.torrent', body, 'binary', fn);
                    });

                });

            }
        };
    };
}
