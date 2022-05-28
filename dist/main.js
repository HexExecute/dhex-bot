"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const DHexClient_1 = require("./Structures/DHexClient");
const config_json_1 = __importDefault(require("./config.json"));
exports.client = new DHexClient_1.DHexClient();
console.clear();
exports.client.events.register();
exports.client.login(config_json_1.default.client.token);
