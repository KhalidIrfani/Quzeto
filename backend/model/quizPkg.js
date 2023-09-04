const mongoose = require('mongoose');
const User = require('./user')
const Question = require('./question')

// Define the schema for the quizpkg model
const quizpkgSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    type: {
        type: String,
    },
    category: {
        type: String,
    },
    registrationFee: {
        type: Number,
    },
    date: {
        type: String,
    },
    startTime: {
        type: String, // You can change this to Date if needed
    },
    endTime: {
        type: String, // You can change this to Date if needed
    },
    duration: {
        type: String, // You can change this to Number if needed
    },
    quantity: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, // Reference to the User model
        required: true,
    },
    questionId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Question,    // Reference to the Question model
    }],
});

// Create a quizpkg model using the schema
const Quizpkg = mongoose.model('quizpkg', quizpkgSchema);

module.exports = Quizpkg;
