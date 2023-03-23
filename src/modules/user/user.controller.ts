import { Request, Response } from "express";
import { nanoid } from "nanoid";
import sendEmail from "../../utils/mailer";
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "./user.schema";
import { createUser, findUserByEmail, findUserById } from "./user.service";
import log from "../../utils/logger";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const body = req.body;

  try {
    const user = await createUser(body);

    return res.send("User successfully created");
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("User already exists");
    }

    return res.status(500).send(e);
  }
};

export const forgotPasswordHandler = async (
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) => {
  const message =
    "If a user with that email is registered you will receive a password reset email";

  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    log.debug(`User with email ${email} does not exists`);
    return res.send(message);
  }

  const passwordResetCode = nanoid();

  user.passwordResetCode = passwordResetCode;

  await user.save();

  await sendEmail({
    to: user.email,
    from: "test@example.com",
    subject: "Reset your password",
    // html:`<button><a href="http://localhost:5000/api/users/resetpassword/${passwordResetCode}/${user._id} target="_blank">Reset Password</a></button>`,
    text: `Password reset code: ${passwordResetCode}. Id ${user._id}`,
  });

  log.debug(`Password reset email sent to ${email}`);

  return res.send(message);
};

export const resetPasswordHandler = async (
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) => {
  const { id, passwordResetCode } = req.params;

  const { password } = req.body;

  const user = await findUserById(id);

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode
  ) {
    return res.status(400).send("Could not reset user password");
  }

  user.passwordResetCode = null;

  user.password = password;

  await user.save();

  return res.send("Successfully updated password");
};

export const getCurrentUserHandler = async (req: Request, res: Response) => {
  return res.send(res.locals.user);
};
