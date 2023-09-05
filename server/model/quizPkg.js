const mongoose = require('mongoose');
const User = require('./user')
const Question = require('./question')


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
        type: String
    },
    endTime: {
        type: String
    },
    duration: {
        type: String, 
    },
    quantity: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, 
        required: true,
    },
    questionId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Question,    
    }],
});


const Quizpkg = mongoose.model('quizpkg', quizpkgSchema);

module.exports = Quizpkg;
