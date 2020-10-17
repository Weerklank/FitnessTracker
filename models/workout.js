const mongoose = require("mongoose")

const Schema = mongoose.Schema

const workout = new Schema(
    {
        _id: Number,
        day: {
            type: Date,
            default: () => new Date()
        },
        exercise: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: true
                },
                name: {
                    type: String,
                    trim: true,
                    required: true
                },
                duration: {
                    type: Number,
                    required: true
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

workout.virtual("total").get(function () {
    const dur = 0
    exercise.array.forEach(x => {
        dur = dur + x.duration
    });
})

const Workout = mongoose.model("Workout", workout)

module.exports = Workout