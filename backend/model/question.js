const mongoose = require("mongoose");
const User = require('./user')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    correctAnswer: {
        type: String,
    },
    options: [
        {
            type: String
        }
    ],

    type: {
        type: String
    },
    subject: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, // Replace 'User' with the name of your User model
    },

});

module.exports = mongoose.model("Question", questionSchema);
