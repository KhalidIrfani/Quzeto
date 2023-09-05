const mongoose = require('mongoose');
const User = require('./user')
const Question = require('./question')

const scheduleSchema = new mongoose.Schema({
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
        default: 0
    },
    date: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    minParticipants: {
        type: Number,
    },
    duration: {
        type: String,
    },
    firstPrice: {
        type: Number,
        default: 10
    },
    secondPrice: {
        type: Number,
        default: 15
    },
    thirdPrice: {
        type: Number,
        default: 20
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
    
    totalParticipant: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
