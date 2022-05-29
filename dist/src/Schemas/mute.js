"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reqString = {
    type: String,
    required: true,
};
const muteSchema = new mongoose_1.default.Schema({
    authorID: reqString,
    targetID: reqString,
    reason: reqString,
    active: {
        type: Boolean,
        required: true,
    },
    expiresAt: {
        type: Date,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('mutes', muteSchema);
