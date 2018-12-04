const Logger = require('disnode-logger');
const Serial = require("./src/serial")

const QuotesMode = require("./src/mod_quotes")
const TimeMod = require("./src/mod_time")
const DiscordMod = require("./src/mod_discord")
const TestMod = require("./src/mod_test")

Logger.Info("Server", "main", "Starting Server.");


Serial.connect("/dev/ttyACM0");

//DiscordMod.start(Serial.port);
TimeMod.start();
//TestMod.start();