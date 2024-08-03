"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokenIfUserNot = exports.checkTokenErr = void 0;
exports.checkTokenErr = {
    status: 401,
    message: "Login Again",
    forFrontend: true,
};
exports.checkTokenIfUserNot = {
    status: 401,
    message: "User not found",
    forFrontend: true,
};
//# sourceMappingURL=errObj.js.map