import { Request, Response } from "express";
import { createAccessToken } from "./jwt";

//-------------------------- Refresh token controller ------------------------//
export const refreshToken = (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const accesstoken = createAccessToken({ id: user._id, email: user.email });
    res.status(200).json({ accesstoken });
  } catch (error: any) {
    res.status(501).json({ success: false, message: error.message });
  }
};
