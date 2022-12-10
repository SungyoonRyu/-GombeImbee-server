import express from "express";
import bookmark from "../controller/bookmark.js";

const router = express.Router();

router.get("/add", bookmark.add);
router.get("/del", bookmark.del);
router.get("/get", bookmark.get);
router.post("/search", bookmark.search);

export default router;