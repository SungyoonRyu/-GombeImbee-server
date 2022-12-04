import express from 'express'; 
import bookmarkRouter from './bookmark.js';
import groupRouter from './group.js';
import workspaceRouter from './workspace.js';
import userRouter from './user.js';

const router = express.Router();

router.get("", async (req, res) => {});
router.use("/bookmark", bookmarkRouter);
router.use("/workspace", workspaceRouter);
router.use("/group", groupRouter);
router.use("/usr", userRouter);

export default router;