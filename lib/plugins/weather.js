var util = require('util');
var Plugin = require('../plugin');

var request = require('request');
var querystring = require('querystring');

exports = module.exports = Weather;

function Weather(jarvis, options){
    options = options || {};

    Plugin.call(this, jarvis, options);

    this.name = "weather"
};

util.inherits(Weather, Plugin);

Weather.prototype.process = function(cmd){
    this.log("process("+cmd+")");
    //TODO
    /*
    switch(cmd){
        case '':

            break;
    }


    RELATIVE_DAYS = ["aujourd'hui", "demain", "après-demain"];
    DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];


    var txt = "";

    for(var i in result.list){

        if(i < 3){
            var day = RELATIVE_DAYS[i];
        }else{
            var day = DAYS[new Date(result.list[i].dt*1000).getDay()];
        }

        var weather = result.list[i].weather[0];

        var sentences = [];

        switch(weather.id){
            case 800:
                sentences = ["il fera beau", "aucun nuages à l'horizon"];
                break;
            case 801:
                sentences = ["il y aura quelques nuages"];
                break;
            case 802:
            case 803:
            case 804:
                sentences = ["le ciel sera couvert"];
                break;

            case 500:
                sentences = ["il pleuvra légèrement", "quelques gouttes tomberont"];
                break;
            case 501:
                sentences = ["il pleuvra modérément"];
                break;
            default:
                sentences = ["il fera " + weather.description];
                break;
        }

        txt += day + " " + sentences[Math.floor(Math.random() * sentences.length)] + ". ";


    }

    tts.say(txt);
    */

};

function _getCurrentWeather(params, callback){
    __get("weather", params, callback);
};

function _getForecast(params, callback){
    __get("forecast", params, callback);
};

function _getDailyForecast(params, callback){
    __get("forecast/daily", params, callback);
};

function __get(url, params, callback){
    callback = callback || function(err, res){};

    params = params || {};
    params.mode = params.mode || "json";
    params.units = params.units ||"metric";
    params.lang = params.lang || "fr";

    url = 'http://api.openweathermap.org/data/2.5/' + url + '?' + querystring.stringify(params);

    request(url, function(error, response, body){
        if (!error && response.statusCode == 200) {
            callback(null, JSON.parse(body));
        }else{
            callback(error);
        }
    });

};
