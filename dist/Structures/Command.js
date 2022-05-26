"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(data) {
        Object.assign(this, data);
        if (!data.ephemeral)
            this.ephemeral = false;
    }
}
exports.Command = Command;
