const mongoose = require("mongoose");
const Question = require('./question');
const user = require("./user");
const schedule = require("./schedule");

const resultSchema = new mongoose.Schema({
    userId: { // You can include user-related information here
        type: mongoose.Schema.Types.ObjectId,
        ref: user, // Reference to the User model (if applicable)
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: schedule
    },
    questions: [{
        question: {
            type: String // Reference to the Question model
        },
        selectedAnswer: {
            type: String,
        },
        isCorrect: {
            type: Boolean,
        },

    }],
    correctAnswer: {
        type: Number
    },
    score: {
        type: Number,
    },
    totalQuestions: {
        type: Number,
    },
    totalWrongAnswers: {
        type: Number,
    },
    attemptedQuestion: {
        type: Number
    },

});

module.exports = mongoose.model("Answer", resultSchema);
