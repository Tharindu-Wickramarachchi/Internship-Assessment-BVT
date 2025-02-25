import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  resendVerificationEmail,
  deleteAccount,
  getProfile,
  refreshToken,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const routes = express.Router();

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/logout", logout);
routes.post("/verify-email", verifyEmail);
routes.post("/resend-verification-email", resendVerificationEmail);
routes.delete("/delete-account", deleteAccount);
routes.get("/profile", protectRoute, getProfile);
routes.post("/refresh-token", refreshToken);

export default routes;
