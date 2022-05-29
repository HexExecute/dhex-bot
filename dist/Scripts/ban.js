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
exports.checkBans = exports.unban = exports.ban = void 0;
const main_1 = require("../main");
const ban_1 = __importDefault(require("../Schemas/ban"));
const ms_1 = __importDefault(require("ms"));
function getCurrentlyBanned(target) {
    return __awaiter(this, void 0, void 0, function* () {
        const previousBans = yield ban_1.default.find({ targetID: target.id });
        return previousBans.filter(ban => ban.active === true);
    });
}
function ban(author, target, reason, duration) {
    return __awaiter(this, void 0, void 0, function* () {
        const targetMember = yield main_1.client.guild.members.fetch(target.id);
        if (!targetMember)
            return;
        if (!targetMember.bannable)
            return;
        const currentlyBanned = yield getCurrentlyBanned(target);
        let time;
        if (duration)
            time = new Date(Date.now() + (0, ms_1.default)(duration));
        else
            time = null;
        if (currentlyBanned.length)
            for (const ban of currentlyBanned) {
                ban.active = false;
                ban.save();
            }
        return yield new ban_1.default({
            authorID: author.user.id,
            targetID: target.id,
            reason: reason,
            active: true,
            expiresAt: time,
        })
            .save()
            .then(() => __awaiter(this, void 0, void 0, function* () {
            if (!(yield main_1.client.guild.bans.fetch()).get(target.id))
                yield main_1.client.guild.bans.create(target.id, { reason: reason });
            console.log(`INFO: ${target.id} has been banned by ${author.user.id}`);
            if (duration)
                setTimeout(() => checkBans(), (0, ms_1.default)(duration));
        }));
    });
}
exports.ban = ban;
function unban(target) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield main_1.client.guild.bans.fetch()).get(target.id))
            return;
        const currentlyBanned = yield getCurrentlyBanned(target);
        if (currentlyBanned.length)
            for (const ban of currentlyBanned) {
                ban.active = false;
                ban.save();
            }
        main_1.client.guild.bans.remove(target);
        console.log(`INFO: ${target.id} has been unbanned`);
    });
}
exports.unban = unban;
function checkBans() {
    return __awaiter(this, void 0, void 0, function* () {
        ;
        (yield main_1.client.guild.members.fetch()).forEach((target) => __awaiter(this, void 0, void 0, function* () {
            const currentlyBanned = yield getCurrentlyBanned(target.user);
            for (const ban of currentlyBanned) {
                if (!ban.expiresAt)
                    continue;
                if (ban.expiresAt.getTime() <= Date.now())
                    unban(target.user).then(() => console.log(`INFO: ${target.user.id}'s ban has expired`));
            }
        }));
    });
}
exports.checkBans = checkBans;
