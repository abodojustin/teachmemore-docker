import Joi from "joi";
import { IUser } from "../../database/interfaces/User";

const generateRegistrationValidationSchema = (roles: string[]) => {
  return Joi.object({
    name: Joi.string().min(3).optional(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    title: Joi.string().optional(),
    function: Joi.string().optional(),
    phone_number: Joi.number().min(6).optional(),
    date_naiss: Joi.string().allow(''),
    gender: Joi.string().optional(),
    role: Joi.string()
      .valid(...roles)
      .optional(),
    checked: Joi.boolean().allow(''),
    is_active: Joi.boolean().allow(''),
    language: Joi.string().allow(''),
    name_enterprise: Joi.string().required(),
    email: Joi.string().required().email(),
    niveau: Joi.string().allow(''),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref("password"),
  });
};

// ---------------------- REGISTER USER AS A SUPERADMIN VALIDATION ----------------------//
export const registerAsSuperAdminValidation = (data: IUser) => {
  return generateRegistrationValidationSchema([
    "USER",
    "SUPERADMIN",
    "ADMIN",
    "NAUTELAUS",
    "COMMANDITAIRE",
    "COACH",
    "SUPERCOACH",
  ]).validate(data);
};

// ---------------------- REGISTER USER VALIDATION ----------------------//
export const registerAsAdminValidation = (data: IUser) => {
  return generateRegistrationValidationSchema([
    "USER",
    "NAUTELAUS",
    "COMMANDITAIRE",
    "COACH",
    "SUPERCOACH",
  ]).validate(data);
};

//--------------------- LOGIN VALIDATION ----------------------------//
export const loginValidation = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
