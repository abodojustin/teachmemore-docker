import { Schema, model } from "mongoose";
import { ISession } from "../interfaces/Session";

export const DOCUMENT_NAME = "Session";
export const COLLECTION_NAME = "sessions";

const schema = new Schema(
  {
    token: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SessionModel = model<ISession>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
