import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import {
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";
import { deleteChats } from "../controllers/chat-controllers.js";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);

chatRoutes.delete("/delete-chats", verifyToken, deleteChats);

export default chatRoutes;
