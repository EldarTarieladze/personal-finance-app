import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import { signJwt } from "../../utils/jwt";
import SessionModel from "../session/session.model";
import { privateFields, User } from "../user/user.model";

export const createSession = async ({ userId }: { userId: string }) => {
  return SessionModel.create({ user: userId });
};

export const findSessionById = async (id: string) => {
  return SessionModel.findById(id);
};

export const signRefreshToken = async ({ userId }: { userId: string }) => {
  const session = await createSession({
    userId,
  });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
};

export const signAccessToken = (user: DocumentType<User>) => {
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });

  return accessToken;
};
