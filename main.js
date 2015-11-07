
var tessel = require('tessel')
var wifiInit = require('./wifi/wifi-control.js')
var ambientFiles = require('./ambient/ambient.js')

wifiInit.wifiInit();

ambientFiles.ambientInit();