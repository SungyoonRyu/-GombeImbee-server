import express from "express";
import workspace from "../controller/workspace.js";

const router = express.Router();

router.get("/get", workspace.get);

export default router;