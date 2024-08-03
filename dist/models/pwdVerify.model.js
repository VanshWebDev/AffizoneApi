"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PwdVerify = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pwdVerifySchema = new mongoose_1.default.Schema({
    sub: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    picture: {
        type: String,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        index: { expires: "2m" },
    }, // Expires in 2 minutes
}, { timestamps: true });
exports.PwdVerify = mongoose_1.default.model("PwdVerify", pwdVerifySchema);
//# sourceMappingURL=pwdVerify.model.js.map