import { NextFunction, Request, Response } from "express";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import User from "../models/user.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "user not registered or token malfunctioned" });
    console.log("came to generate response 🔃");

    //grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all chats with new one to api
    const config = configureOpenAI();
    console.log("step1");
    const openai = new OpenAIApi(config);
    console.log("step2");
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    console.log("step3");
    //get latest response
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    console.log("saved");
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("user not registered or Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("permission didnt match");
    }
    return res.status(200).json({
      message: "OK correct password",
      chats: user.chats,
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("user not registered or Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("permission didnt match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ message: "ERROR", cause: error.message });
  }
};
