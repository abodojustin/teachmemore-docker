import express from "express";
import { login } from "../auth/login";
import { registerAsAdmin, registerAsSuperAdmin } from "../auth/register";
import { reinitializeLink, updateUserPassword } from "../auth/password";
import { logout } from "../auth/logout";
import { AuthorizationUser } from "../middlewares/validations/authorization.validation";
import { refreshToken } from "../auth/refreshToken";

const router = express.Router();

router.post("/super_admin/register", registerAsSuperAdmin);
router.post("/admin/register", registerAsAdmin);

router.post("/login", login);
router.post("/logout", AuthorizationUser, logout);

router.post("/refresh_token", AuthorizationUser, refreshToken);
router.post("/create-link", reinitializeLink);

router.post("/modify-password", AuthorizationUser, updateUserPassword);

export default router;
