"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Structures/Event");
exports.default = new Event_1.Event('ready', () => {
    console.clear();
    console.log('INFO: online');
});
