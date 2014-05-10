var EventEmitter = require('events').EventEmitter;
var mixin = require('utils-merge');
var proto = require('./bot');

exports = module.exports = createBot;

function createBot(){
    var bot = {};

    mixin(bot, proto);
    mixin(bot, EventEmitter.prototype);

    bot.init();

    return bot;
}
