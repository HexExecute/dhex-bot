"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CommandHandler = void 0;
const config_json_1 = __importDefault(require("../config.json"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CommandHandler {
    constructor(client) {
        this.commands = new Map();
        this.slashCommands = [];
        this.client = client;
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = path_1.default.join(__dirname, '../', config_json_1.default.commands.directory);
            const files = fs_1.default.readdirSync(dir);
            for (const file of files) {
                let cmd = (yield Promise.resolve().then(() => __importStar(require(dir + file)))).default;
                this.commands.set(cmd.name, cmd);
                this.slashCommands.push(cmd);
                if (cmd.aliases)
                    for (const alias of cmd.aliases) {
                        this.commands.set(alias, cmd);
                        let temp = Object.assign({}, cmd);
                        temp.name = alias;
                        temp.aliases = null;
                        temp.description = 'Alias for ' + cmd.name;
                        this.slashCommands.push(temp);
                    }
            }
            if (!config_json_1.default.general.guildID)
                return console.error('ERROR: please provide a guildID in the config');
            const guild = yield this.client.guilds.fetch(config_json_1.default.general.guildID);
            guild.commands
                .set(this.slashCommands)
                .then(() => console.log('INFO: commands have been registered'));
        });
    }
    getCommand(command) {
        const cmd = this.commands.get(command);
        if (cmd)
            return cmd;
        else
            throw new Error(`ERROR: couldn't find command named '${command}'`);
    }
}
exports.CommandHandler = CommandHandler;
