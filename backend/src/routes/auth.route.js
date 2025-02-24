import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  resendVerificationEmail,
  deleteAccount,
} from "../controllers/auth.controller.js";

const routes = express.Router();

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/logout", logout);
routes.post("/verify-email", verifyEmail);
routes.post("/resend-verification-email", resendVerificationEmail);
routes.delete("/delete-account", deleteAccount);

export default routes;
