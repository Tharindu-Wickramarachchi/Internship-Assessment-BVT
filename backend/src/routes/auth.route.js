import express from "express";
import { signup } from "../controllers/auth.controller.js";

const routes = express.Router();

routes.post("/signup", signup);

export default routes;
