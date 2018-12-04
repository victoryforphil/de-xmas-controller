const Serial = require("./serial")
const Logger = require("disnode-logger")
module.exports.start = () => {
    setTimeout(() => {
        Logger.Success("ModTime", "start", "Time module started!")
        setInterval(() => {
            Serial.write("lcd", new Date().toTimeString() + new Date().toDateString())
           //Serial.write("t")
        }, 100);
    }, 1000)
}