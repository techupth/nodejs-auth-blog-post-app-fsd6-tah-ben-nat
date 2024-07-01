import bcrypt from "bcrypt";
import { createUser, findUserByUsername } from "../models/userModel.mjs";
import { generateToken } from "../utils/jwtUtils.mjs";

export const register = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  try {
    const userExists = await findUserByUsername(username);
    if (userExists) {
      return res.status(404).json({ message: "User already exists" });
    }
    const userId = await createUser(username, password, firstName, lastName);
    return res.status(201).json({
      message: `User has been created successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);
    return res.status(200).json({
      message: `login successfully`,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
