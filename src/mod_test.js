const Serial = require("./serial")
const Logger = require("disnode-logger")
module.exports.start = () => {
    setInterval(() => {
        Logger.Success("ModTest", "start", "Test module started!")
        Serial.write("lcd","01234567890abcdefghijklmpqrstuvwxyzABCDEFG");
    }, 500)
}