"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIfUsername = exports.getUserIfEamil = exports.resIfUserObj = void 0;
const user_model_1 = require("../../../models/user.model");
const resIfUserObj = (user) => {
    return {
        statusCode: 200,
        jsonObj: {
            message: "All done",
            user: {
                id: user?._id.toString(),
                email: user?.email,
                username: user?.username,
                interest: user?.interest,
                picture: user?.picture,
            },
        },
    };
};
exports.resIfUserObj = resIfUserObj;
const getUserIfEamil = async (email) => {
    return await user_model_1.User.findOne({ email });
};
exports.getUserIfEamil = getUserIfEamil;
const getUserIfUsername = async (username) => {
    return await user_model_1.User.findOne({ username });
};
exports.getUserIfUsername = getUserIfUsername;
//# sourceMappingURL=checktokenFunc.js.map