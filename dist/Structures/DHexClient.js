"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DHexClient = void 0;
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./CommandHandler");
const config_json_1 = require("../config.json");
class DHexClient extends discord_js_1.Client {
    constructor() {
        super(config_json_1.client.options);
        this.handler = new CommandHandler_1.CommandHandler(this);
    }
    start() {
        this.login(config_json_1.client.token);
    }
}
exports.DHexClient = DHexClient;
