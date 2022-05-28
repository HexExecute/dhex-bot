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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Structures/Command");
const mute_1 = require("../Scripts/mute");
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
exports.default = new Command_1.Command({
    name: 'mute',
    description: 'A command to mute members.',
    usage: 'mute !(member) ?(duration)',
    permissions: ['MANAGE_MESSAGES'],
    options: [
        {
            name: 'member',
            description: 'member to mute',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'reason for mute',
            type: 'STRING',
            required: true,
        },
        {
            name: 'duration',
            description: 'duration of mute',
            type: 'STRING',
            required: false,
        },
    ],
    execute: ({ interaction, args, client, author }) => __awaiter(void 0, void 0, void 0, function* () {
        const target = yield client.guild.members.fetch(args.member);
        if (args.duration)
            if ((0, ms_1.default)(args.duration))
                yield (0, mute_1.mute)(interaction, target, args.reason, args.duration);
            else
                return interaction.editReply('Please provide a valid duration.');
        else
            yield (0, mute_1.mute)(interaction, target, args.reason, args.duration);
        const embed = new discord_js_1.MessageEmbed()
            .setTitle('Mute')
            .setDescription(`<@${author.id}> has muted <@${args.member}>`)
            .setThumbnail(target.user.displayAvatarURL())
            .setAuthor({
            name: target.user.tag,
            iconURL: target.user.displayAvatarURL(),
        })
            .addField('Reason', args.reason)
            .setFooter({
            text: author.user.tag,
            iconURL: author.displayAvatarURL(),
        })
            .setTimestamp()
            .setColor('RED');
        if (args.duration) {
            const date = new Date(Date.now() + (0, ms_1.default)(args.duration));
            embed.addField('Expires On', date.toLocaleDateString('en-US', { timeZone: 'America/New_York' }) +
                ' ' +
                date.toLocaleTimeString('en-US', { timeZone: 'America/New_York' }) +
                ' (EST)');
        }
        interaction.editReply({
            embeds: [embed],
        });
    }),
});
