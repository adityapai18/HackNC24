import { users, auth } from "../../drizzle/schema.js"; // Your database schema
import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registration service
export const register = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  // Logic to save user to database (e.g., users.insert({...}))
  const newUser = await users.insert({
    name,
    email,
    password: hashedPassword,
    userType: "normal", // Default user type
    verificationStatus: "pass", // Default verification status
  });
  return newUser;
};

// Login service
export const login = async ({ email, password }) => {
  ß;
  const user = await users.findFirst({ where: { email } }); // Fetch user by email
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  // Save the token in the auth table
  await auth.insert({
    userId: user.id,
    token,
    tokenType: "access",
    expiresAt: new Date(Date.now() + 3600000),
  }); // 1 hour expiration
  return { token, user };
};

// Logout service
export const logout = async (token) => {
  // Logic to invalidate the token (e.g., mark it as revoked)
  await auth.update({ isRevoked: true }, { where: { token } });
};

// Token refresh service
export const refresh = async (token) => {
  // Logic to validate and refresh token
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const newToken = jwt.sign(
    { userId: payload.userId },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  await auth.insert({
    userId: payload.userId,
    token: newToken,
    tokenType: "refresh",
    expiresAt: new Date(Date.now() + 3600000),
  }); // 1 hour expiration
  return newToken;
};

// Password reset service
export const resetPassword = async ({ email, newPassword }) => {
  const user = await users.findFirst({ where: { email } });
  if (!user) throw new Error("User not found");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await users.update({ password: hashedPassword }, { where: { email } }); // Update password in the database
};
