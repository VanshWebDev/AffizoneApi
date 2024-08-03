"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resIfEmailNotSent = exports.resIfEmailSent = void 0;
exports.resIfEmailSent = {
    statusCode: 200,
    jsonObj: {
        message: "Email sent successfully",
        emailSent: true,
    },
};
exports.resIfEmailNotSent = {
    statusCode: 200,
    jsonObj: {
        message: "Email could't sent try after sometime",
        emailSent: false,
    },
};
//# sourceMappingURL=resObj.js.map