"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resIfUserNotExist = exports.resIfUserExist = void 0;
exports.resIfUserExist = {
    cookieName: "token",
    statusCode: 200,
    message: "login successful",
    isNewUser: false,
};
exports.resIfUserNotExist = {
    cookieName: "token",
    statusCode: 200,
    message: "Create password in 120 second",
    isNewUser: true,
};
//# sourceMappingURL=resObj.js.map