import Joi from "joi";

//--------------------- UPDATE USER VALIDATION ----------------------------//
export const updateUserInfosValidation = (data: {
  email: string;
  password: string;
}) => {
  const schema = Joi.object({
    name: Joi.string().min(3).optional(),
    first_name: Joi.string().optional(),
    code: Joi.number().min(1).optional(),
    last_name: Joi.string().optional(),
    title: Joi.string().optional(),
    function: Joi.string().optional(),
    phone_number: Joi.number().min(6).optional(),
    date_naiss: Joi.string().optional(),
    gender: Joi.string().optional(),
    checked: Joi.boolean().optional(),
    is_active: Joi.boolean().optional(),
    language: Joi.string().optional(),
    name_enterprise: Joi.string().optional(),
    email: Joi.string().email().optional(),
    niveau: Joi.array().items(Joi.string()).optional(),
  });
  return schema.validate(data);
};
