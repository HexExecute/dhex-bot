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
const main_1 = require("../main");
const Event_1 = require("../Structures/Event");
const ArgumentFormatter_1 = __importDefault(require("../Scripts/ArgumentFormatter"));
function capitalizeTheFirstLetterOfEachWord(words) {
    let separateWord = words.toLowerCase().split(' ');
    for (let i = 0; i < separateWord.length; i++) {
        separateWord[i] =
            separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(' ');
}
function defer(inter, command) {
    if (command.ephemeral)
        return inter.deferReply({ ephemeral: true });
    else
        return inter.deferReply();
}
exports.default = new Event_1.Event('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    const inter = interaction;
    const args = inter.options.data;
    const command = main_1.client.commands.getCommand(inter.commandName);
    yield defer(inter, command).then(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (command.permissions)
            if (!((_a = inter.memberPermissions) === null || _a === void 0 ? void 0 : _a.has(command.permissions)))
                return inter.editReply(`Sorry, you don't have permissions to run that command!\n\nRequired: ${capitalizeTheFirstLetterOfEachWord(command.permissions.join(', ').replace('_', ' '))}
            `);
        const authorUser = (_b = inter.member) === null || _b === void 0 ? void 0 : _b.user;
        const author = yield main_1.client.guild.members.fetch(authorUser.id);
        command.execute({
            interaction: inter,
            args: (0, ArgumentFormatter_1.default)(args),
            client: main_1.client,
            author: author,
        });
    }));
}));
