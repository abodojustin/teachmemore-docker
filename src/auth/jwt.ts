import jwt from "jsonwebtoken";

interface UserJWTPayload {
  id: string;
  email: string;
}

// -------------------- JWT FUNCTIONS -----------------//
export const createAccessToken = (user: UserJWTPayload) => {
  if (!process.env.TOKEN_ACCESS_SECRET) {
    throw new Error("TOKEN_ACCESS_SECRET environment variable is not defined.");
  }
  return jwt.sign(user, process.env.TOKEN_ACCESS_SECRET, {
    expiresIn: "1d",
  });
};

export const createRefreshToken = (user: UserJWTPayload) => {
  if (!process.env.TOKEN_REFRESH_TOKEN) {
    throw new Error("TOKEN_REFRESH_TOKEN environment variable is not defined.");
  }
  return jwt.sign(user, process.env.TOKEN_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
};
