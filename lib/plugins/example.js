var util = require('util');
var Plugin = require('../plugin');

exports = module.exports = Example;

function Example(jarvis, options){
    options = options || {};

    Plugin.call(this, jarvis, options);

    this.name = "example"
};

util.inherits(Example, Plugin);

Example.prototype.foo = function() {
    this.log("foo");
};

Example.prototype.bar = function() {
    this.log("bar");
};

Example.prototype.process = function(cmd){
    this.log("process("+cmd+")");
};
