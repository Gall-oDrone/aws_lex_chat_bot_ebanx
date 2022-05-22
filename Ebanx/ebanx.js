//Require the module
var ebanx;
var ebanxMod;
ebanxMod = require('ebanx');
ebanx = new ebanxMod();

//Configure the integration key and test mode
ebanx.configure({
  integrationKey : '1231000',
  testMode : true
});