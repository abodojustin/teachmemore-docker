import { Request, Response } from "express";
import { SessionModel } from "../database/models/Session";

//------------------------------ GET USER BY HIS ID  -----------------------------//
export const logout = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const accessToken = res.locals.accessToken;
    await SessionModel.findOneAndDelete({
      user: user._id,
      token: accessToken,
    });
    res.status(200).json({ msg_en: "Signed out", msg_fr: "Deconnecté" });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};
