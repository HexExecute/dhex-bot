"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const Event_1 = require("../Structures/Event");
exports.default = new Event_1.Event('interactionCreate', interaction => {
    if (!interaction.isCommand())
        return;
    const inter = interaction;
    const args = inter.options.data;
    console.log(main_1.client.commands.commands);
    main_1.client.commands.runCommand(inter.commandName, {
        interaction: inter,
        args: args,
    });
});
