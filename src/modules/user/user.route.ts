import express from "express";
import userRequire from "../../middleware/userRequire";
import validateResource from "../../middleware/validateResource";
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
} from "./user.controller";
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "./user.schema";

const router = express.Router();

//create user

router.post("/users", validateResource(createUserSchema), createUserHandler);

// forgot password

router.post(
  "/users/forgotpassword",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

// reset password

router.post(
  "/users/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

// get me

router.get("/users/me", userRequire, getCurrentUserHandler);

export default router;
