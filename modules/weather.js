var http = require('http');

function toUrlParams(obj){
    var str = '';
    for( var name in obj ) {
        str += (name + '=' + encodeURIComponent(obj[name]) + '&');
    }
    str = str.slice(0,-1);
    return str;
}

module.exports = {

    start: function() {
        console.log("Weather module started");
    },

    __get: function(url, params, callback){

        params = params || {};
        params.mode = params.mode || "json";
        params.units = params.units ||"metric";
        params.lang = params.lang || "fr";

        var url = 'http://api.openweathermap.org/data/2.5/' + url + '?' + toUrlParams(params);

        var options = require('url').parse( /**String*/ url );
        options.rejectUnauthorized = false;
        options.agent = new http.Agent( options );

        http.get(options, function(res) {
            res.setEncoding('utf-8');

            var response = "";
            res.on('data', function (data) {
                response += data;
            }).on('end', function(){
                callback(JSON.parse(response));
            });

        });

    },

    getCurrentWeather: function(params, callback){
        this.__get("weather", params, callback);
    },

    getForecast: function(params, callback){
        this.__get("forecast", params, callback);
    },

    getDailyForecast: function(params, callback){
        this.__get("forecast/daily", params, callback);
    }

};
