"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DHexClient = void 0;
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./CommandHandler");
const EventHandler_1 = require("./EventHandler");
const config_json_1 = __importDefault(require("../config.json"));
class DHexClient extends discord_js_1.Client {
    constructor() {
        super(config_json_1.default.client.options);
        this.commands = new CommandHandler_1.CommandHandler(this);
        this.events = new EventHandler_1.EventHandler(this);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.login(config_json_1.default.client.token);
            yield this.commands.register();
            yield this.events.register();
        });
    }
}
exports.DHexClient = DHexClient;
