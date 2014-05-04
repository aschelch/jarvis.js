var exec = require('child_process').exec;

module.exports = {

    log: function(text){
        console.log("[Speak] "+text);
    },

    start: function() {
        this.log("Speak module started");
    },

    say: function(text, callback){
        this.log("Saying: "+text+"...");
        var that = this;

        exec('mpg321 "http://translate.google.com/translate_tts?tl=fr&q='+encodeURIComponent(text)+'"', function (error, stdout, stderr) {
            if (error !== null) {
                that.log(stderr);
            }else{
                callback();
            }
        });

    }

};
