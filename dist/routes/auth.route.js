"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const auth_controller_1 = require("../controller/auth.controller");
const express_1 = __importDefault(require("express"));
const route_1 = require("../utils/error/route");
const router = express_1.default.Router();
router.post("/signup", (0, route_1.routeWrapper)(auth_controller_1.signup));
router.post("/login", (0, route_1.routeWrapper)(auth_controller_1.login));
router.get("/checktoken", (0, route_1.routeWrapper)(auth_controller_1.checkToken));
router.get("/checkusername", (0, route_1.routeWrapper)(auth_controller_1.checkUsernameAvailablity));
router.post("/createpassword", (0, route_1.routeWrapper)(auth_controller_1.createpassword));
router.post("/forget-pwd", (0, route_1.routeWrapper)(auth_controller_1.forgetpassword));
router.post("/verify-otp", (0, route_1.routeWrapper)(auth_controller_1.verifyOtp));
router.delete("/logout", (0, route_1.routeWrapper)(auth_controller_1.logout));
router.get("/ram", (0, route_1.routeWrapper)(auth_controller_1.Ram));
module.exports = router;
//# sourceMappingURL=auth.route.js.map