import express from "express";
import user from "../user/user.route";

const router = express.Router();

router.use(user);

export default router;
