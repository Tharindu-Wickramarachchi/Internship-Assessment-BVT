import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
} from "../controllers/auth.controller.js";

const routes = express.Router();

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/logout", logout);
routes.post("/verify-email", verifyEmail);

export default routes;
