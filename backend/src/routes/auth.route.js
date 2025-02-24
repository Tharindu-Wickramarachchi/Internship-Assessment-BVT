import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const routes = express.Router();

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/logout", logout);

export default routes;
