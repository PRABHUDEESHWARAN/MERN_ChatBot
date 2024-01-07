import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
const createtoken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    console.log(token);
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "token Not Received" });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                console.log("token verification Successful ✅😭 ");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
export default createtoken;
//# sourceMappingURL=token-manager.js.map