"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOptions(option) {
    const res = {};
    if (!option.options)
        return;
    for (const subOption of option.options)
        res[subOption.name] = subOption.value;
    return res;
}
function default_1(options) {
    const args = {};
    for (const option of options) {
        switch (option.type) {
            case 'SUB_COMMAND':
                args[option.name] = getOptions(option);
                break;
            case 'SUB_COMMAND_GROUP':
                if (!option.options)
                    break;
                args[option.name] = {};
                for (const subOption of option.options) {
                    args[option.name][subOption.name] = getOptions(subOption);
                }
                break;
            default:
                args[option.name] = option.value;
                break;
        }
    }
    return args;
}
exports.default = default_1;
