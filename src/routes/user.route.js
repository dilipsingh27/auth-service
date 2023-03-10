const router = require("express").Router();
const {
  createUser,
  loginUser,
  validateToken,
} = require("../controllers/user.controller");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/validate", validateToken);

module.exports = {
  userRouter: router,
};
