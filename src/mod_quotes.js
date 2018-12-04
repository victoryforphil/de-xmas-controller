const Logger = require("disnode-logger");
const Eris = require("eris")
const Serial = require("./serial")
var interval = null;
module.exports.start = function (serial) {
    Logger.Info("ModQuotes", "start", "Connecting to discord...");
    var bot = new Eris("MTcwMDIwODA3MTk4NjM4MDgw.DucF2w.sGU4NMYTTuEGsNZzlbv5ZKOBRGQ");
    bot.on("ready", () => {
        Logger.Success("ModQuotes", "start", "Bot Connected!");
        Logger.Info("ModQuotes", "start", "Getting quotes");
        
        bot.on("messageCreate", (msg) => {
            if(msg.channel === "511739972789731333") {
                Logger.Info("ModQuotes", "OnMessage", "New Message, Loading quotes");
                loadQuotes(bot);
            }
        });

        loadQuotes(bot);
    });
    bot.connect();
}


function loadQuotes(bot){
    bot.getMessages("511739972789731333").then((msgs)=>{
        Logger.Success("ModQuotes", "start", `Found ${msgs.length} msgs`);
        var quotes = [];
        msgs.forEach(msg => {
            quotes.push(msg.content)
        });

        sendRandomQuote(quotes);
    })
}
function sendRandomQuote(quotes){
   
    
    var maxIndex = quotes.length -1;
    var current = 0;
    if(interval){
        clearInterval(interval);
    }
    interval = setInterval(()=>{
        var toSend = quotes[current];
        
        toSend = toSend.substring(1, 32);
        console.log(toSend);
        Serial.write("lcd", toSend);
        current++;

        if(current == maxIndex){
            current = 0;
        }

    }, 5000);
}