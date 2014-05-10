/**
 * Module dependencies.
 */

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

/**
 * Terminal
 *
 * Examples:
 *
 *       .use(terminal({}))
 *       .use(function(bot){
 *          bot.on('message', function(message){
 *              console.log(message);
 *          })
 *       });
 *
 */

module.exports = function terminal(options){
    options = options || {};
    prompt = options.prompt || "cmd> ";

    return function terminal(bot){

        rl.setPrompt(prompt);
        rl.prompt();
        rl.on('line', function(line) {

            bot.emit("terminal:message", line);

            rl.prompt();
        }).on('close', function() {
            process.exit(0);
        });

    };
}
