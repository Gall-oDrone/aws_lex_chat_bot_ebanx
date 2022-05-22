//Require the module
var ebanx;
var ebanxMod;
ebanxMod = require('ebanx');
ebanx = new ebanxMod();

//Configure the integration key and test mode
ebanx.configure({
  integrationKey : 'your-integration-key',
  testMode : true
});