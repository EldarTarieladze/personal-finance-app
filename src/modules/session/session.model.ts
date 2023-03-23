import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.model";

export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});

export default SessionModel;
