import { Schema, model } from "mongoose";
import { IRole } from "../interfaces/Role";

export const DOCUMENT_NAME = "Role";
export const COLLECTION_NAME = "roles";

const schema = new Schema({
  name_role: {
    en: String,
    fr: String,
  },
});

export const RoleModel = model<IRole>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
