/**
 * Module dependencies.
 */

var request = require('request');
var querystring = require('querystring');

/**
 * Weather
 *
 * Examples:
 *
 *       .use(weather({units:"metric"}))
 *       .use(function(bot){
 *          bot.weather.forecast({q:"Paris,fr"}, function(err, data){
 *              console.log(data);
 *          });
 *       });
 *
 */

module.exports = function weather(options){
    options = options || {};

    return function weather(bot){

        function __get(url, params, fn){
            fn = fn || function(err, res){};

            params = params || {};
            params.mode = params.mode || "json";
            params.units = params.units ||"metric";
            params.lang = params.lang || "fr";

            url = 'http://api.openweathermap.org/data/2.5/' + url + '?' + querystring.stringify(params);

            request(url, function(error, response, body){
                if (!error && response.statusCode == 200) {
                    fn(null, JSON.parse(body));
                }else{
                    fn(error);
                }
            });

        };

        bot.weather = {
            current: function(query, fn){
                __get('weather', query, fn);
            },
            forecast: function(query, fn){
                __get('forecast', query, fn);
            },
            daily: function(query, fn){
                __get('forecast/daily', query, fn);
            }
        }

    };
}
