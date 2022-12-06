import express from "express";
import workspace from "../controller/workspace.js";

const router = express.Router();

router.get("/get_list", workspace.workspace_list);
router.get("/get_node", workspace.get_node);
router.post("/add", workspace.add);
router.post("/delete", workspace.del);

export default router;