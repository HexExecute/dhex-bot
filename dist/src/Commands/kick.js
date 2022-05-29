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
const discord_js_1 = require("discord.js");
const Command_1 = require("../Structures/Command");
exports.default = new Command_1.Command({
    name: 'kick',
    description: 'A command to kick members.',
    usage: 'kick !(member) !(reason)',
    permissions: ['KICK_MEMBERS'],
    options: [
        {
            name: 'member',
            description: 'member to kick',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'reason for kick',
            type: 'STRING',
            required: true,
        },
    ],
    execute: ({ interaction, args, client, author }) => __awaiter(void 0, void 0, void 0, function* () {
        const target = yield client.guild.members.fetch(args.member);
        if (!target.kickable) {
            interaction.editReply(`Sorry, but you can't kick that person!`);
            return setTimeout(() => interaction.deleteReply(), 5000);
        }
        target.kick(args.reason).then(() => interaction.editReply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle('Kick')
                    .setDescription(`<@${author.id}> has kicked <@${args.member}>`)
                    .setThumbnail(target.user.displayAvatarURL())
                    .addField('Reason', args.reason)
                    .setAuthor({
                    name: target.user.tag,
                    iconURL: target.user.displayAvatarURL(),
                })
                    .setFooter({
                    text: author.user.tag,
                    iconURL: author.displayAvatarURL(),
                })
                    .setTimestamp()
                    .setColor('#C03D2F'),
            ],
        }));
    }),
});
