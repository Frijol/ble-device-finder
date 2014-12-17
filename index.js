console.log('Initializing, please wait...');

var tessel = require('tessel');
var leds = [tessel.led[2], tessel.led[3], tessel.led[0], tessel.led[1]];
var blelib = require('ble-ble113a');
var ble = blelib.use(tessel.port['A']);

ble.on('ready', function(err) {
  console.log('Scanning...');
  meter(0);
  ble.startScanning();
});

ble.on('discover', function(peripheral) {
  console.log("Discovered peripheral!");
  meter(4);
  console.log(peripheral);
});

// val is the number (0 through 4) LEDs that should be on
function meter(val) {
  for (var led in leds) {
    if (val > parseInt(led)) {
      leds[led].output(1);
    } else {
      leds[led].output(0);
    }
  }
}
