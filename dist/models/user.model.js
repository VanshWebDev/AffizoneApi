"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AttemptedMcqSchema = new mongoose_1.default.Schema({
    mcqId: {
        type: String,
        required: true,
    },
    attemptedAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 60, // Set expiry time to 60 days
    },
}, { _id: false } // Disables automatic creation of _id for subdocuments
);
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        select: false,
    },
    sub: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    interest: {
        type: [String],
    },
    attemptedMcq: {
        type: [AttemptedMcqSchema],
        default: [],
    }
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user.model.js.map