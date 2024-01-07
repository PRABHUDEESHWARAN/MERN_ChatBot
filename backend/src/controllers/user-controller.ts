import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { hash, compare } from "bcrypt";
import createtoken from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    const token = createtoken(user._id.toString(), email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res
      .status(201)
      .json({ message: "User created✅", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
const userSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    console.log("here");
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("user not registered");
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send("Incorrect password");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    const token = createtoken(user._id.toString(), email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res
      .status(200)
      .json({
        message: "OK correct password",
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ message: "ERROR", cause: error.message });
  }
};

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("user not registered or Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("permission didnt match");
    }
    return res
      .status(200)
      .json({
        message: "OK correct password",
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ message: "ERROR", cause: error.message });
  }
};


const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("user not registered or Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("permission didnt match");
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    return res
      .status(200)
      .json({
        message: "OK User LoggedOut ✅",
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ message: "ERROR", cause: error.message });
  }
};
export { getAllUsers, userSignup, userSignIn ,verifyUser,logoutUser};
