const mongoose = require("mongoose");
const Question = require('./question');
const user = require("./user");
const schedule = require("./schedule");

const resultSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: user,  
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: schedule
    },
    questions: [{
        question: {
            type: String  
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
