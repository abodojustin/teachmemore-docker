import { Request, Response } from "express";

import { UserModel } from "../models/User";
import { updateUserInfosValidation } from "../../middlewares/validations/user.validation";
import { ObjectId } from "mongodb";

//------------------------------ GET USER BY HIS ID -----------------------------//
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select("-password").exec();
    if (!user)
      return res.status(404).json({
        msg_en: "User not found",
        msg_fr: "Utilisateur non trouvé",
      });
    res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

//------------------------------ GET USER BY HIS TOKEN  -----------------------------//
export const getUserBytoken = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(res.locals.user._id)
      .select("-password")
      .populate("name_enterprise")
      .populate("questionnaires_fullfilled")
      .populate({
        path: "questionnaires_fullfilled",
        populate: {
          path: "menu",
          model: "Menu",
        },
      })
      .populate({
        path: "questionnaires_fullfilled",
        populate: {
          path: "sprint",
          model: "Sprint",
        },
      })
      .populate({
        path: "name_enterprise",
        populate: {
          path: "menus",
          model: "Menu",
        },
      })
      .populate({
        path: "name_enterprise",
        populate: {
          path: "menus.themes",
          model: "Theme",
        },
      })
      .populate("niveau")
      .exec();
    res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

//------------------------------ GET ALL USERS IN THE DB -----------------------------//
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find()
      .populate("name_enterprise")
      .populate("niveau")
      .select("-password")
      .exec();
    res.status(200).json({ total: users.length, data: users });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

//------------------------------ UPDATE USER -----------------------------//
export const updateUserInfos = async (req: Request, res: Response) => {
  // const body = req.body;
  const { id, niveau, ...data } = req.body;
  console.log("req.body --> ", req.body);
  // const data = req.body;
  // const { error } = updateUserInfosValidation(data);
  // if (error) return res.status(400).json(error.details[0].message);
  try {
    const user = await UserModel.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ msg_en: "User not found", msg_fr: "Utilisateur non trouvé" });

    const convertedNiveaux = Array.isArray(niveau)
      ? niveau.map((niveauId: any) => new ObjectId(niveauId))
      : [];

    // Mettre à jour l'utillisateur avec les nouvelles données
    user.niveau = convertedNiveaux;
    Object.assign(user, data);
    await UserModel.findByIdAndUpdate(id, user);
    res
      .status(202)
      .json({ msg_en: "User updated", msg_fr: "Utilsateur mis à jour" });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const response = await UserModel.findById(id);

    if (!response)
      return res
        .status(404)
        .json({ msg_en: "not found", msg_fr: "non trouvé" });

    await UserModel.findByIdAndDelete(id);
    res.status(202).json({ msg_fr: "supprimé", msg_en: "deleted" });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
}
