const Logger = require("disnode-logger");
const Eris = require("eris")
const Serial = require("./serial")
var interval = null;
module.exports.start = function (serial) {
    Logger.Info("ModDiscord", "start", "Connecting to discord...");
    var bot = new Eris("MTcwMDIwODA3MTk4NjM4MDgw.DucF2w.sGU4NMYTTuEGsNZzlbv5ZKOBRGQ");
    bot.on("ready", () => {
        Logger.Success("ModDiscord", "start", "Bot Connected!");
        
        bot.on("messageCreate", (msg) => {
            var segs = msg.content.split(" ");
            if(segs[0] == "!lcd"){
                Serial.write("lcd", msg.content.substring("5"))
            }
        });

        
    });
    bot.connect();
}
