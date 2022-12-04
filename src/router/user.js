import express from "express";
import user from "../controller/user.js";

const router = express.Router();

router.post("/signin", user.signin);
router.post("/signup", user.signup);

export default router;