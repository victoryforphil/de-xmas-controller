
const Logger = require("disnode-logger")
const SerialPort = require('serialport');
var port = null;
var connected = false;

function write(type, message){
    if(!connected && port != null){
        return;
    }

    port.write(message);
}

function connect(sport){
    Logger.Info("Serial", "connect", "Connecting to serial")
    if(sport == "default"){
        getConnectedArduino();
    }else{
        port = new SerialPort(sport, {
            buadRate: 9600
        })
        port.on('open', function () {
            Logger.Success("Serial", "getConnectedArdunio", `Ardunino found on port ${sport}`)
            connected = true;
        })


    }
}

function getConnectedArduino() {
    Logger.Info("Serial", "getConnectedArduino", "Attempting to automatically connect to ardunio.")
    SerialPort.list(function (err, ports){

        if(err){
            Logger.Error("Serial", "getConnectedArduino", err);
            return;
        }

        var allports = ports.length;
        Logger.Info("Serial", "getConnectedArduino", `Found ${allports} ports`);
        var count = 0;
        var done = false
        ports.forEach(function (port) {
            count += 1;
            pm = port['manufacturer'];
            if (typeof pm !== 'undefined' && pm.includes('arduino')) {
                var arduinoport = port.comName.toString();
                var serialPort = require('serialport');
                port = new serialPort(arduinoport, {
                    buadRate: 9600
                })
                port.on('open', function () {
                    Logger.Success("Serial", "getConnectedArdunio", `Ardunino found on port ${arduinoport}`)
                    connected = true;
                })
                done = true;
            }
            if (count === allports && done === false) {
                Logger.Warning("Serial", "getConnectedArdunio", `Ardunino not found`)
            }
        });

    });
}

module.exports.port = port;
module.exports.connect = connect;
module.exports.write = write;