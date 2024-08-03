"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyotpIfExpire = exports.verifyotpIfInvalid = void 0;
exports.verifyotpIfInvalid = {
    status: 400,
    message: "Invalid OTP",
    forFrontend: true,
};
exports.verifyotpIfExpire = {
    status: 404,
    message: "OTP expired generate new one",
    forFrontend: true,
};
//# sourceMappingURL=errObj.js.map