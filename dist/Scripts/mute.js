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
exports.checkMutes = exports.unmute = exports.mute = void 0;
const main_1 = require("../main");
const mute_1 = __importDefault(require("../Schemas/mute"));
const config = require('../../config.json');
const ms_1 = __importDefault(require("ms"));
const { muteRole } = config.roles;
function getCurrentlyMuted(target) {
    return __awaiter(this, void 0, void 0, function* () {
        const previousMutes = yield mute_1.default.find({
            targetID: target.user.id,
        });
        return previousMutes.filter(mute => mute.active === true);
    });
}
function unmute(target) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentlyMuted = yield getCurrentlyMuted(target);
        if (currentlyMuted.length)
            for (const mute of currentlyMuted) {
                mute.active = false;
                mute.save();
            }
        if (target.roles.cache.has(muteRole))
            target.roles.remove(muteRole);
        console.log(`INFO: ${target.user.id} has been unmuted`);
    });
}
exports.unmute = unmute;
function mute(author, target, reason, duration) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentlyMuted = yield getCurrentlyMuted(target);
        let time;
        if (duration)
            time = new Date(Date.now() + (0, ms_1.default)(duration));
        else
            time = null;
        if (currentlyMuted.length)
            for (const mute of currentlyMuted) {
                mute.active = false;
                mute.save();
            }
        return yield new mute_1.default({
            authorID: author.user.id,
            targetID: target.user.id,
            reason: reason,
            active: true,
            expiresAt: time,
        })
            .save()
            .then(() => {
            !target.roles.cache.has(muteRole) ? target.roles.add(muteRole) : null;
            console.log(`INFO: ${target.user.id} has been muted by ${author.user.id}`);
            if (duration)
                setTimeout(() => checkMutes(), (0, ms_1.default)(duration));
        });
    });
}
exports.mute = mute;
function checkMutes() {
    return __awaiter(this, void 0, void 0, function* () {
        ;
        (yield main_1.client.guild.members.fetch()).forEach((target) => __awaiter(this, void 0, void 0, function* () {
            const currentlyMuted = yield getCurrentlyMuted(target);
            for (const mute of currentlyMuted) {
                if (!mute.expiresAt)
                    continue;
                if (mute.expiresAt.getTime() <= Date.now())
                    unmute(target).then(() => console.log(`INFO: ${target.user.id}'s mute has expired`));
            }
        }));
    });
}
exports.checkMutes = checkMutes;
