const express = require('express');
const Schedule = require('../model/schedule'); // Adjust the path to your Schedule model
const Question = require('../model/question'); // Adjust the path to your Question model
const user = require('../model/user');


// create the schedule 
const createSchedule = async (req, res, next) => {
    try {
        const { title, type, registrationFee, quantity, userId, startTime, endTime, category, date, minParticipants, duration, firstPrice, secondPrice, thirdPrice } = req.body;
        const foundQuestions = await Question.find({ createdBy: userId, type: type }).limit(parseInt(quantity));

        if (foundQuestions.length < parseInt(quantity)) {
            return res.status(400).json({ error: `Insufficient number of ${type} questions created by the user` });
        }

        const questionIds = foundQuestions.map(question => question._id);

        const quizData = new Schedule({
            title,
            type,
            registrationFee,
            quantity,
            userId,
            startTime,
            endTime,
            category,
            date,
            minParticipants,
            duration,
            firstPrice,
            secondPrice,
            thirdPrice,
            questionId: questionIds,
        });

        const newSchedule = new Schedule(quizData);
        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Registered Quiz

const registerQuiz = async (req, res) => {
    try {
        const { userId, quizId } = req.body
        const schedule = await Schedule.findById(quizId)

        if (!schedule) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        schedule.totalParticipant.push(userId)
        const updatedSchedule = await schedule.save()
        res.status(200).json({ message: 'User registered successfully', updatedSchedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user in quiz' });
    }

}

const checkregisterquiz = async (req, res) => {
    try {
        const { quizId, userId } = req.params;
        const schedule = await Schedule.findById(quizId);

        if (!schedule) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        if (!schedule.totalParticipant || !Array.isArray(schedule.totalParticipant)) {
            return res.status(500).json({ error: 'Invalid participant data' });
        }

        const isRegistered = schedule.totalParticipant.includes(userId);

        // Return the actual registration status
        res.status(200).json({ isRegistered });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to check user registration' });
    }
};



// get All Schedule Data
const getSchedule = async (req, res, next) => {
    try {
        const schedules = await Schedule.find(); // Retrieve all schedules from the database
        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error fetching schedule data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//get Single Schedule
const getSingle = async (req, res, next) => {
    try {
        const Id = req.params.id
        const schedules = (await Schedule.find({ userId: Id }));
        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error fetching schedule data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Add the participant question in the schedule 
const updateTotalParticipant = async (req, res) => {
    try {
        const { scheduleId, totalParticipant } = req.body;

        const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, {
            $set: { totalParticipant }
        }, { new: true });

        res.status(200).json(updatedSchedule);
    } catch (error) {
        console.error('Error updating total participant:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


//get the scheduleID 
const getScheduleById = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const schedule = await Schedule.findById(scheduleId).populate('questionId');
        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }
        const question = schedule.questionId;

        const scheduleDetails = {
            id: schedule._id,
            title: schedule.title,
            prize: schedule.firstPrice,
            totalParticipants: schedule.minParticipants,
            questions: question,
            registrationFee: schedule.registrationFee,
            type: schedule.type,
            quantity: schedule.quantity,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            category: schedule.category,
            date: schedule.date,
            minParticipants: schedule.minParticipants,
            duration: schedule.duration,
            firstPrice: schedule.firstPrice,
            secondPrice: schedule.firstPrice,
            thirdPrice: schedule.thirdPrice
            // Include any other details you want to send
        };
        // console.log("first", scheduleDetails)
        res.json({ scheduleDetails });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the schedule' });
    }
};

// Delete Schedule
const deleteSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const schedule = await Schedule.findById(scheduleId);

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        await schedule.deleteOne(); // Use the remove() method

        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Schedule
const updateSchedule = async (req, res, next) => {
    try {
        const { scheduleId } = req.params;
        const updatedData = req.body; // New data for updating the schedule

        // Find the schedule by ID and update it
        const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, updatedData, { new: true });

        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}





module.exports = {
    createSchedule,
    getSchedule,
    updateTotalParticipant,
    getSingle,
    getScheduleById,
    deleteSchedule,
    updateSchedule,
    registerQuiz,
    checkregisterquiz
};



