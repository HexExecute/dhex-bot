"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const DHexClient_1 = require("./Structures/DHexClient");
const config = require('../config.json');
exports.client = new DHexClient_1.DHexClient();
console.clear();
exports.client.events.register();
exports.client.login(config.client.token);
