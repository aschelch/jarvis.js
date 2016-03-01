/**
 * Module dependencies.
 */
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
/**
 * Android
 *
 * Examples:
 *
 *       .use(webapp())
 *
 */

module.exports = function webapp(options){
    return function webapp(bot){

        var app = express();

        app.set('port', process.env.PORT || 3000);
        app.set('views', 'views');
        app.set('view engine', 'jade');
        //app.use(favicon());
        //app.use(express.logger('dev'));
        //app.use(bodyParser());
        //app.use(methodOverride());
        //app.use(express.cookieParser());
        //app.use(express.session({ secret: 'your secret here' }));
        //app.use(app.router);s
        app.use(express.static('public'));


        app.get('/', function (req, res) {
          res.redirect('/dashboard');
        })

        app.get('/dashboard', function (req, res) {
            res.render('dashboard', {
                title: 'Dashboard',
                id: 'dashboard',
                brand: bot.set("name"),
                version: bot.set("version"),
                devices: bot.presence.list()
            })
        })

        app.get('/home', function (req, res) {
            res.render('home', {
                title: 'Home',
                id: 'home',
                brand: bot.set("name"),
                version: bot.set("version"),
            })
        })

        app.get('/settings', function (req, res) {
          res.render('settings', { title: 'Settings', id: 'settings', brand: bot.set("name"), version: bot.set("version") })
        })

        app.get('/reboot', function (req, res) {
            res.redirect('/dashboard');
            process.exit(0);

        })

        app.listen(3000);

    }
}
