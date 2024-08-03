"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifClientPayloadNot = exports.createPasswordErr = exports.ifUsernameExist = exports.ifLengthNotValid = exports.ifUsernameNotValid = exports.ifUsernameUndefined = void 0;
exports.ifUsernameUndefined = {
    status: 404,
    message: "Username not found",
    forFrontend: true,
};
exports.ifUsernameNotValid = {
    status: 401,
    message: "Use only small letters, numbers, and underscores.",
    forFrontend: true,
};
exports.ifLengthNotValid = {
    status: 401,
    message: "Username must be between 3 and 30 characters.",
    forFrontend: true,
};
exports.ifUsernameExist = {
    status: 401,
    message: "Username already exist",
    forFrontend: true,
};
exports.createPasswordErr = {
    status: 400,
    message: "Something went wrong",
    forFrontend: true,
};
exports.ifClientPayloadNot = {
    status: 400,
    message: "payload not defined",
    forFrontend: true,
};
//# sourceMappingURL=errObj.js.map