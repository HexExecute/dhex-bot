"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const config_json_1 = require("../config.json");
class Command {
    constructor(data) {
        this.data = data;
        if (!this.data.prefix)
            this.data.prefix = config_json_1.commands.defaultPrefix;
    }
}
exports.Command = Command;
