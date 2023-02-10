const express = require("express");

const authController = require("../controllers/auth-controller");
const authernticate = require("../middlewares/authernticate");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/userProfile", authernticate, authController.userProfile);
router.get("/me", authernticate, authController.getMe);

module.exports = router;
