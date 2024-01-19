import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserBytoken,
  updateUserInfos,
} from "../database/repositories/UserRepository";
import {
  AuthorizationAdmin,
  AuthorizationUser,
  AuthorizationSuperAdmin,
} from "../middlewares/validations/authorization.validation";

const router = express.Router();

router.get("/current", AuthorizationUser, getUserBytoken); //get authenticated user
router.get("/get_all", 
// AuthorizationUser, 
// AuthorizationSuperAdmin, 
getAllUsers); //get all users
router.put(
  "/",
  // AuthorizationUser,
  // AuthorizationAdmin,
  updateUserInfos
);
router.delete("/delete/:id", deleteUser);

router.get("/get-users", (req, res) => {
  res.send({ message: "Bonjour à tous les utilisateurs !" });
});

export default router;
