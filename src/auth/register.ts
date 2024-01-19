import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../database/models/User";
import { passwordStrength } from "check-password-strength";
import {
  registerAsAdminValidation,
  registerAsSuperAdminValidation,
} from "../middlewares/validations/auth.validation";
import { IUser } from "../database/interfaces/User";

export async function registerAsSuperAdmin(req: Request, res: Response) {
  const data: IUser = req.body;
  // const { error } = registerAsSuperAdminValidation(data);
  // if (error) return res.status(400).json({error: error.details[0].message}); //this will return a validation error message

  try {
    const userExist = await UserModel.findOne({ email: data.email });
    if (userExist)
      return res.status(406).json({ message: "this user already exist" });

    // const passwordStatus = passwordStrength(data.password).value;

    // if (passwordStatus === "Too weak" || passwordStatus === "Weak") {
    //   return res.status(400).json({
    //     msg_en: "Password to weak",
    //     msg_fr: "Mot de passe faible",
    //   });
    // }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const newUser = await new UserModel({ ...data, password: passwordHash }); //replace input password by the hashed one
    await newUser.save(); //save the new user to the database
    return res.status(201).json({
      msg_en: "User successfully created",
      msg_fr: "Utilisateur créer",
    });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}
export async function registerAsAdmin(req: Request, res: Response) {
  const data: IUser = req.body;
  const { error } = registerAsAdminValidation(data);
  if (error) return res.status(400).json(error.details[0].message); //this will return a validation error message

  try {
    const userExist = await UserModel.findOne({ email: data.email });
    if (userExist)
      return res.status(406).json({ message: "this user already exist" });

    // const passwordStatus = passwordStrength(data.password).value;

    // if (passwordStatus === "Too weak" || passwordStatus === "Weak") {
    //   return res.status(400).json({
    //     msg_en: "Password to weak",
    //     msg_fr: "Mot de passe faible",
    //   });
    // }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const newUser = await new UserModel({ ...data, password: passwordHash }); //replace input password by the hashed one
    await newUser.save(); //save the new user to the database
    return res.status(201).json({ msg: "User successfully created" });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
}
