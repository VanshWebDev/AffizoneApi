"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifUsernameAvilable = exports.ifUsernameNotAvilable = void 0;
exports.ifUsernameNotAvilable = {
    statusCode: 200,
    jsonObj: {
        message: "Username already taken",
        isUsernameAvilable: false,
    },
};
exports.ifUsernameAvilable = {
    statusCode: 200,
    jsonObj: {
        message: "Username avilable",
        isUsernameAvilable: true,
    },
};
//# sourceMappingURL=resObj.js.map