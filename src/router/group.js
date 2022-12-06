import express from "express";
import group from "../controller/group.js";

const router = express.Router();

router.get("/get_list", group.group_list);
router.post("/add", group.add);
router.post("/delete", group.del);

export default router;