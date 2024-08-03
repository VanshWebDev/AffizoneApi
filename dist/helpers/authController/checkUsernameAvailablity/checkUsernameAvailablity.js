"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserExist = void 0;
const user_model_1 = require("../../../models/user.model");
const checkIfUserExist = async (usr) => {
    const existingUser = await user_model_1.User.findOne({ username: usr }).select("username");
    if (existingUser)
        return true;
    else
        return false;
};
exports.checkIfUserExist = checkIfUserExist;
//# sourceMappingURL=checkUsernameAvailablity.js.map