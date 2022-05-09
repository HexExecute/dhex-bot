"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Structures/Command");
const iCommand_1 = require("../Typings/iCommand");
exports.default = new Command_1.Command({
    name: 'ping',
    description: 'A simple test command.',
    usage: 'ping',
    type: iCommand_1.CommandType.Interaction,
    permissions: ['ADMINISTRATOR'],
    execute: ({ interaction }) => {
        interaction.reply({ content: 'Pong!', ephemeral: true });
    },
});
