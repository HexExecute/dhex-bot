"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const GetCommandPermissions_1 = __importDefault(require("../Scripts/GetCommandPermissions"));
const Command_1 = require("../Structures/Command");
function commandInfo(command) {
    let commandInfo = `description: ${command.description}\nusage: ${command.usage}`;
    if (command.permissions)
        commandInfo += `\npermissions: ${(0, GetCommandPermissions_1.default)(command)}`;
    return commandInfo;
}
exports.default = new Command_1.Command({
    name: 'help',
    description: 'A command to give info on all commands.',
    usage: 'help ?(cmd)',
    ephemeral: true,
    options: [
        {
            name: 'command',
            description: 'command to get help for',
            type: 'STRING',
        },
    ],
    execute: ({ interaction, args, client }) => {
        const commands = client.commands.list;
        if (!args.command) {
            const commandArray = Array.from(commands.values());
            const embed = new discord_js_1.MessageEmbed()
                .setTitle('Commands')
                .setColor('GREY');
            if (client.user)
                embed.setThumbnail(client.user.displayAvatarURL()).setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL(),
                });
            for (const command of commandArray)
                embed.addField(command.name, commandInfo(command));
            return interaction.editReply({ embeds: [embed] });
        }
        const command = commands.get(args.command.toLowerCase());
        const embed = new discord_js_1.MessageEmbed();
        if (!command)
            return interaction.editReply('Please provide an actual command.');
        embed
            .setTitle(command.name)
            .setDescription(commandInfo(command))
            .setColor('GREY');
        return interaction.editReply({ embeds: [embed] });
    },
});
