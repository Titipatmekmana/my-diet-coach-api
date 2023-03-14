const express = require("express");

const workoutController = require("../controllers/workout-controller");
const authernticate = require("../middlewares/authernticate");

const router = express.Router();

router.get("/", authernticate, workoutController.workout);
router.post("/workoutDate", authernticate, workoutController.workoutDate);

router.get("/all", authernticate, workoutController.getWorkout);
router.get("/burnCal", authernticate, workoutController.updateBurnCal);

router.delete("/:id", authernticate, workoutController.deleWorkout);

module.exports = router;
