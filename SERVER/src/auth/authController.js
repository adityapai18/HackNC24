import * as authService from './authServices.js';

export const registerUser = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  console.log("yaha",req.body)

  try {
    const { token, user } = await authService.login(req.body);
    console.log(token, user);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await authService.logout(req.body.token);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const newToken = await authService.refresh(req.body.token);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.body);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
