const express = require("express");
const authRouter = express.Router();
const { signupNewUser, signinUser } = require("../controllers/auth.js");

authRouter.post("/signup", signupNewUser);
authRouter.post("/signin", signinUser);

module.exports = authRouter;