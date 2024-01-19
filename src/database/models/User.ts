import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/User";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export enum UserRole {
  USER = "USER",
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  NAUTELAUS = "NAUTELAUS",
  COMMANDITAIRE = "COMMANDITAIRE",
  COACH = "COACH",
  SUPERCOACH = "SUPERCOACH",
}

const schema = new Schema(
  {
    name: String,
    first_name: String,
    code: {
      type: Number,
      unique: true,
    },
    last_name: String,
    title: String,
    function: String,
    phone_number: Number,
    date_naiss: String,
    gender: String,
    checked: Boolean,
    is_active: Boolean,
    language: String,
    name_enterprise: {
      type: Schema.Types.ObjectId,
      ref: "Organisation",
      autopopulate: true,
    },
    role: {
      type: String,
      default: "USER",
      enum: [
        "USER",
        "SUPERADMIN",
        "ADMIN",
        "NAUTELAUS",
        "COMMANDITAIRE",
        "COACH",
        "SUPERCOACH",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    niveau: [
      {
        type: Schema.Types.ObjectId,
        ref: "Niveau",
        autopopulate: true,
      },
    ],
    password: String,
    questionnaires_fullfilled: [
      {
        type: Schema.Types.ObjectId,
        ref: "Questionnaire",
        autopopulate: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware pour générer automatiquement le code
schema.pre("save", async function (next) {
  if (!this.isNew) {
    // Si le document n'est pas nouveau, ne rien faire
    return next();
  }

  // Générer le code de manière automatique (par exemple, en utilisant une séquence)
  // Assurez-vous d'ajuster cette logique en fonction de vos besoins
  const lastUser = await UserModel.findOne({}, {}, { sort: { code: -1 } });
  const newCode = (lastUser?.code || 0) + 1;

  this.code = newCode;

  return next();
});

export const UserModel = model<IUser>(DOCUMENT_NAME, schema, COLLECTION_NAME);
