import {
  checkToken,
  checkUsernameAvailablity,
  createpassword,
  forgetpassword,
  login,
  logout,
  Ram,
  signup,
  verifyOtp,
} from "../controller/auth.controller";
import express from "express";
import { routeWrapper } from "../utils/error/route";
const router = express.Router();

router.post("/signup", routeWrapper(signup));

router.post("/login", routeWrapper(login));

router.get("/checktoken", routeWrapper(checkToken));

router.get("/checkusername", routeWrapper(checkUsernameAvailablity));

router.post("/createpassword", routeWrapper(createpassword));

router.post("/forget-pwd", routeWrapper(forgetpassword));

router.post("/verify-otp", routeWrapper(verifyOtp));

router.delete("/logout", routeWrapper(logout));

router.get("/ram", routeWrapper(Ram));
// igetintopc.com
export = router;
