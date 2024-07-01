import { db } from "../utils/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const createUser = async (username, password, firstname, lastname) => {
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const result = await db.collection("techup_users").insertOne({
      username: username,
      password: hashPassword,
      firstName: firstname,
      lastName: lastname,
    });

    return result.insertedId;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw error;
  }
};

export const findUserByUsername = async (username) => {
  try {
    const user = await db.collection("techup_users").findOne({ username });
    if (!user) {
      console.log(`User not found`);
    }
    return user;
  } catch (error) {
    console.error(
      `Error finding user by username=${username}: ${error.message}`
    );
  }
  throw error;
};
