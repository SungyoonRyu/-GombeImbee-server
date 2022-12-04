import express from "express";
import group from "../controller/group.js";

const router = express.Router();

router.get("/get", group.get);

export default router;