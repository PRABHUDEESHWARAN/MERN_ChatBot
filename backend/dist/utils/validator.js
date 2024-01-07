import { body, validationResult } from "express-validator";
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            console.log("validate done✅");
            return next();
        }
        return res.status(402).json({ errors: errors.array() });
    };
};
const signInValidator = [
    body("email").trim().isEmail().withMessage("Invalid Format"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should have atleast 6 characters"),
];
const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...signInValidator,
];
const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];
export { validate, signInValidator, signUpValidator, chatCompletionValidator };
//# sourceMappingURL=validator.js.map