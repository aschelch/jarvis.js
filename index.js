
var program = require('commander');

var Jarvis = require('./lib/jarvis');


program
  .version('1.0.0')
  .option('-v, --voice [Loic]', 'Voxygen voice to use in tts (Loic, Agnes, Melodine, Chut, Bicool, Philippe, Electra, Damien, DarkVadoor, Ramboo, John, Helene, Eva, JeanJean, Papi, Robot, Sidoo, Sorciere, Yeti, Zozo)', 'Loic')
  .parse(process.argv);


var jarvis = new Jarvis();
jarvis.start()
