"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetpwdIfUsername = exports.forgetpwdIfDuplicatekay = exports.forgetpwdIfUserNot = void 0;
exports.forgetpwdIfUserNot = {
    status: 404,
    message: "user not found",
    forFrontend: true,
};
exports.forgetpwdIfDuplicatekay = {
    status: 400,
    message: "OTP already sent",
    forFrontend: true,
};
exports.forgetpwdIfUsername = {
    status: 400,
    message: "enter only mail",
    forFrontend: true,
};
//# sourceMappingURL=errObj.js.map