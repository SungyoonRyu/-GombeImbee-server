import express from "express";
import workspace from "../controller/workspace.js";

const router = express.Router();

router.get("/get_list", workspace.workspace_list);
router.get("/get_node", workspace.get_node);
router.post("/add", workspace.add);
router.post("/delete", workspace.del);
router.post("/workspace_member", workspace.workspace_member);
router.post("/add_workspace_member", workspace.add_workspace_member);
router.post("/del_workspace_member", workspace.del_workspace_member);

export default router;