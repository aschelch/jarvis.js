var util = require('util');
var Plugin = require('../plugin');

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);


exports = module.exports = Terminal;

function Terminal(jarvis, options){
    options = options || {};

    Plugin.call(this, jarvis, options);

    this.name = "terminal"
};

util.inherits(Terminal, Plugin);


Terminal.prototype.start = function(){
    this.log("start");

    var self = this;

    rl.setPrompt("cmd> ");
    rl.prompt();
    rl.on('line', function(line) {

        self.jarvis.process(line);

        rl.prompt();
    }).on('close', function() {
        process.exit(0);
    });

};

Terminal.prototype.process = function(cmd){
    this.log("process("+cmd+")");
    switch(cmd){
        case 'quit':
        case 'quitter':
            process.exit(0);
            return true;
    }

    return false;
};
