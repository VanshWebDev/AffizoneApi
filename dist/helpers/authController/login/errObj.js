"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginErr1 = exports.loginErr = exports.ifPasswordNotMatch = void 0;
exports.ifPasswordNotMatch = {
    status: 422,
    message: "password does not match",
    forFrontend: true,
};
exports.loginErr = {
    status: 401,
    message: "User not found",
    forFrontend: true,
};
exports.loginErr1 = {
    status: 401,
    message: "Password does not match",
    forFrontend: true,
};
//# sourceMappingURL=errObj.js.map