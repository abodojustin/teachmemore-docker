import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel, UserRole } from "../../database/models/User";
import { SessionModel } from "../../database/models/Session";

export const AuthorizationUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ")[1];

    if (!process.env.TOKEN_ACCESS_SECRET) {
      throw new Error(
        "TOKEN_ACCESS_SECRET environment variable is not defined."
      );
    }
    //we decode the user passwword and verify if it fit with the one stored in th database
    jwt.verify(
      bearer,
      process.env.TOKEN_ACCESS_SECRET,
      async (err, user: any) => {
        if (err)
          return res.status(404).json({
            msg_en: "Incorrect email or password",
            msg_fr: "Email ou mot de passe incorrect",
          });
        if (user) {
          UserModel.findOne({ _id: user.id }).then(async (userAuth) => {
            if (!userAuth || userAuth.is_active === false) {
              return res.status(404).json({
                msg_en: "Incorrect email or password",
                msg_fr: "Email ou mot de passe incorrect",
              });
            }

            res.locals.user = userAuth;
            const session = await SessionModel.findOne({
              token: bearer,
              user: userAuth._id,
            });
            if (!session)
              return res.status(404).json({
                msg_en: "Session expired",
                msg_fr: "Session expirée",
              });
            res.locals.accessToken = session.token;
            next();
          });
        }
      }
    );
  } else {
    return res.status(402).json({ msg: "Access Denied" });
  }
};

const authorizeRole = (requiredRole: UserRole) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;
      if (user.role === UserRole.SUPERADMIN) {
        next();
      } else if (user.role === requiredRole) {
        next();
      } else {
        return res.status(400).json({
          msg_en: "Access denied",
          msg_fr: "Accès non authorisé",
        });
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  };
};

export const AuthorizationSuperAdmin = authorizeRole(UserRole.SUPERADMIN);
export const AuthorizationAdmin = authorizeRole(UserRole.ADMIN);
export const AuthorizationNautelaus = authorizeRole(UserRole.NAUTELAUS);
export const AuthorizationCommanditaire = authorizeRole(UserRole.COMMANDITAIRE);
export const AuthorizationCoach = authorizeRole(UserRole.COACH);
export const AuthorizationSuperCoach = authorizeRole(UserRole.SUPERCOACH);
