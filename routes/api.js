const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
  console.log("api workout")
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
      console.log("post", dbWorkout)
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log("api id workout", params.id, params)
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(dbWorkouts => {
      console.log("get workouts",dbworkouts)
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7)
    .then(dbWorkouts => {
      console.log("get workouts range",dbworkouts)
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
