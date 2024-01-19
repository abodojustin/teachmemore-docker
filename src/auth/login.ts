import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../database/models/User";
import { loginValidation } from "../middlewares/validations/auth.validation";
import { createAccessToken, createRefreshToken } from "./jwt";
import { SessionModel } from "../database/models/Session";

export async function login(req: Request, res: Response) {
  try {
    const data: { email: string; password: string } = req.body;
    const { error } = loginValidation(data);
    if (error) return res.status(400).json(error.details[0].message);

    const user = await UserModel.findOne({ email: data.email });
    if (!user)
      return res.status(404).json({
        msg_en: "Incorrect email or password",
        msg_fr: "Email ou mot de passe incorrect",
      });
    const isVerified = await bcrypt.compare(data.password, user.password);
    if (!isVerified)
      return res.status(404).json({
        msg_en: "Incorrect email or password",
        msg_fr: "Email ou mot de passe incorrect",
      });

    const accesstoken = createAccessToken({
      id: user._id.toString(),
      email: user.email,
    });
    const refreshtoken = createRefreshToken({
      id: user._id.toString(),
      email: user.email,
    });

    await SessionModel.create({ user: user._id, token: accesstoken });
    res.status(202).json({
      accessToken: accesstoken,
      refreshToken: refreshtoken,
      user: user,
    });
  } catch (error: any) {
    res.status(503).json({ success: false, message: error.message });
  }
}
