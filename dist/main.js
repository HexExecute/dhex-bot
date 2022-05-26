"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const DHexClient_1 = require("./Structures/DHexClient");
exports.client = new DHexClient_1.DHexClient();
exports.client.start();
