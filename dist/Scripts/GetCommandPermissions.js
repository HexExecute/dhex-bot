"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function capitalizeTheFirstLetterOfEachWord(words) {
    let separateWord = words.toLowerCase().split(' ');
    for (let i = 0; i < separateWord.length; i++) {
        separateWord[i] =
            separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(' ');
}
function default_1(command) {
    return capitalizeTheFirstLetterOfEachWord(command.permissions.join(', ').replace('_', ' '));
}
exports.default = default_1;
