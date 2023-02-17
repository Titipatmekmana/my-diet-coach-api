const express = require("express");

const workoutController = require("../controllers/workout-controller");
const authernticate = require("../middlewares/authernticate");

const router = express.Router();

router.get("/", workoutController.workout);
