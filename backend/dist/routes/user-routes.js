import { Router } from "express";
import { getAllUsers, userSignup, userSignIn, logoutUser } from "../controllers/user-controller.js";
import { validate, signInValidator, signUpValidator } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import { verifyUser } from "../controllers/user-controller.js";
const userRoutes = Router();
userRoutes.get("/getAllUsers", getAllUsers);
userRoutes.post("/SignUp", validate(signUpValidator), userSignup); //domain/api/v1/user/signup
userRoutes.post("/signIn", validate(signInValidator), userSignIn);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, logoutUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map