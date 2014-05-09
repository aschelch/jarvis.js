var http = require('http');
var request = require('request');
var fs = require('fs');


var util = require('util');
var Plugin = require('../plugin');

exports = module.exports = Torrent;

function Torrent(jarvis, options){
    options = options || {};

    Plugin.call(this, jarvis, options);

    this.name = "torrent"
};

util.inherits(Torrent, Plugin);

Torrent.prototype.process = function(cmd){
    this.log("process("+cmd+")");

    // TODO
};


var apiUrl = 'http://api.t411.me';
var token = '';

function login(username, password, fn){
    console.log("Login : "+username);

    request({
        url : apiUrl + '/auth',
        method : 'POST',
        form : {
            'username' : username,
            'password' : password
        }
    }, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);

            if(json.token){
                token = json.token;
            }

            fn(json);
        }
    });
};

function searchTorrent(term, fn){
    console.log("Search torrent : "+term);

    var options = {
        url : apiUrl + '/torrents/search/' + term,
        headers : { "Authorization" : token }
    };

    request(options, function(error, response, body){
        fn(JSON.parse(body));
    });

};

function downloadTorrent(id, fn){
    console.log("Download torrent : "+id);

    var options = {
        url : apiUrl + '/torrents/download/' + id,
        headers : { "Authorization" : token }
    };

    request(options, function(error, response, body){
        if (!error) {
            fs.writeFile("download.torrent", body, function(err) {
                if(err) { console.log(err); return;}

                fn();
            });
        }
    });
};
