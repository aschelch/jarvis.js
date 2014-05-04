var http = require('http');
var request = require('request');
var fs = require('fs');

module.exports = {

    apiUrl : 'http://api.t411.me',
    token : '',

    start: function() {
        console.log("Torrent module started");
    },

    login: function(username, password, callback){
        console.log("Login : "+username);

        request({
            url : this.apiUrl + '/auth',
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

                callback(json);
            }
        });
    },

    searchTorrent: function(term, callback){
        console.log("Search torrent : "+term);

        var options = {
            url : this.apiUrl + '/torrents/search/' + term,
            headers : { "Authorization" : token }
        };

        request(options, function(error, response, body){
            callback(JSON.parse(body));
        });

    },

    downloadTorrent: function(id, callback){
        console.log("Download torrent : "+id);

        var options = {
            url : this.apiUrl + '/torrents/download/' + id,
            headers : { "Authorization" : token }
        };

        request(options, function(error, response, body){
            if (!error) {
                fs.writeFile("download.torrent", body, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        callback();
                    }
                });
            }
        });
    }

};
