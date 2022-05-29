"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Structures/Command");
const mute_1 = require("../Scripts/mute");
const discord_js_1 = require("discord.js");
exports.default = new Command_1.Command({
    name: 'unmute',
    description: 'A command to unmute members.',
    usage: 'unmute !(member)',
    permissions: ['MANAGE_MESSAGES'],
    options: [
        {
            name: 'member',
            description: 'member to unmute',
            type: 'USER',
            required: true,
        },
    ],
    execute: ({ interaction, args, client, author }) => __awaiter(void 0, void 0, void 0, function* () {
        const target = yield client.guild.members.fetch(args.member);
        yield (0, mute_1.unmute)(target);
        interaction.editReply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle('Un-Mute')
                    .setDescription(`<@${author.id}> has unmuted <@${args.member}>`)
                    .setThumbnail(target.user.displayAvatarURL())
                    .setAuthor({
                    name: target.user.tag,
                    iconURL: target.user.displayAvatarURL(),
                })
                    .setFooter({
                    text: author.user.tag,
                    iconURL: author.displayAvatarURL(),
                })
                    .setTimestamp()
                    .setColor('GREEN'),
            ],
        });
    }),
});
