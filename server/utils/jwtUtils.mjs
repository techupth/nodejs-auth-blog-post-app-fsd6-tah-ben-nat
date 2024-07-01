import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.SECRET_KEY;

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, firstName: user.firstName, lastName: user.lastName },
    secretKey,
    {
      expiresIn: "1h",
    }
  );
};
