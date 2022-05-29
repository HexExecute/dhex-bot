"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config = require('../../config.json');
exports.default = {
    run: () => new Promise(() => {
        const app = (0, express_1.default)();
        app.get('/', (req, res) => {
            res.send('Hello World');
        });
        app.listen(config.api.port, () => {
            console.log('API: online');
        });
    }),
};
