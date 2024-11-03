import { users, auth } from "../../drizzle/schema.js"; // Your database schema
import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

// Registration service
export const register = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    userType: "normal",
    // verificationStatus: "pass",
  }).returning();
  return newUser;
};

export const login = async ({ email, password }) => {
  console.log("Logging in user:", email);

  // Retrieve the user by email
  const user = (await db.select().from(users).where(eq(users.email, email)))[0];

  // Check if user exists and if the password is correct
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id },"mySuper$ecretKey123!@#ForJWTSign1ng", {
    expiresIn: "1h",
  });

  // Insert the token into the auth table
  await db.insert(auth).values({
    userId: user.id,
    token,
    tokenType: "access",
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 3600000), // Set token expiration time to 1 hour
    isRevoked: false, // Set isRevoked to false by default
  });

  // Return the token and user information
  return { token, user };
};

export const logout = async (token) => {
  await db.update(auth).set({ isRevoked: true }).where(eq(auth.token, token));
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
  await db.update(auth).insert({
    userId: payload.userId,
    token: newToken,
    tokenType: "refresh",
    expiresAt: new Date(Date.now() + 3600000),
  }); // 1 hour expiration
  return newToken;
};

export const resetPassword = async ({ email, newPassword }) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.email, email));
};
