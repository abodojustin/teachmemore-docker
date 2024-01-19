import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../database/models/User";
import { sendMail } from "../helpers/mailing/mail";

export async function reinitializeLink(req: Request, res: Response) {
  const email = req.body.email;
  try {
    if (!email)
      return res.status(400).json({
        msg_en: "Enter a valid email",
        msg_fr: "Entrer un email valide",
      });
    const userExist = await UserModel.findOne({ email: email });
    if (!userExist)
      return res
        .status(404)
        .json({ msg_en: "User not found", msg_fr: "Utilisateur non trouvé" });

    const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_ACCESS_SECRET, {
      expiresIn: 200,
    });
    let link = process.env.DOMAIN_APP + "your-link" + token;

    await sendMail(userExist.email, "Notification de confirmation", {
      title: "Réinitialisation de votre mot de passe",
      text: `
                  Veuillez cliquer sur le lien en dessous : <br>
                  ${link}
              `,
      signature: `${process.env.APP_NAME}`,
    });
    res.status(201).json({
      msg_fr:
        "Vous avez reçu un mail de confirmation. Veuillez le lire et effectuer les autres étapes !",
    });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
}

export const updateUserPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  try {
    const user = res.locals.user;
    const newPassword = await bcrypt.hashSync(password, 10);

    await UserModel.findByIdAndUpdate(
      { _id: user._id },
      { password: newPassword }
    );

    res.status(201).json({
      msg_fr: "Votre mot de passe à été mis à jour",
      msg_en: "Password updated",
    });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};
