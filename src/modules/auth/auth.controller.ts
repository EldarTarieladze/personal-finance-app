import { Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../../utils/jwt";
import { findUserByEmail, findUserById } from "../user/user.service";
import { CreateSessionInput } from "./auth.schema";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "./auth.service";

export const createSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) => {
  const message = "Invalid email or password";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send(message);
  }

  // sign a access token
  const accessToken = signAccessToken(user);

  // sign a refresh token
  const refreshToken = await signRefreshToken({ userId: String(user._id) });
  // send the tokens

  return res.send({
    accessToken,
    refreshToken,
  });
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const message = "Could not refresh access token";

  const refreshToken = get(req, "headers.x-refresh");

  if (!refreshToken) return null;

  const decoded = verifyJwt<{ session: string }>(
    String(refreshToken),
    "refreshTokenPublicKey"
  );

  if (!decoded) {
    return res.status(401).send();
  }

  const session = await findSessionById(decoded.session);

  if (!session) {
    return res.status(401).send(message);
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send(message);
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
};
