"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
class CommandHandler {
    constructor(client) {
        this.commands = new Map();
        this.client = client;
    }
    register() { }
}
exports.CommandHandler = CommandHandler;
