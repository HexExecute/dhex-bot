"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Structures/Command");
exports.default = new Command_1.Command({
    name: 'ping',
    description: 'A simple test command.',
    usage: 'ping',
    permissions: ['ADMINISTRATOR'],
    execute: ({ interaction }) => {
        interaction.reply({ content: 'Pong!', ephemeral: true });
    },
});
