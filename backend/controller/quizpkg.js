const express = require('express');
const Quizpkg = require('../model/quizPkg')
const Question = require('../model/question'); // Adjust the path to your Question model
const user = require('../model/user');

const quizpkg = async (req, res) => {
    try {

        const { title, type, registrationFee, quantity, userId, startTime, endTime, category, date, duration } = req.body;
        const foundQuestions = await Question.find({ createdBy: userId, type: type }).limit(parseInt(quantity));

        if (foundQuestions.length < parseInt(quantity)) {
            return res.status(400).json({ error: `Insufficient number of ${type} questions created by the user` });
        }

        const questionIds = foundQuestions.map(question => question._id);

        const quizData = new Quizpkg({
            title,
            type,
            registrationFee,
            quantity,
            userId,
            startTime,
            endTime,
            category,
            date,
            duration,
            questionId: questionIds,
        });

        const newQuizpkg = new Quizpkg(quizData);
        const savedQuizpkg = await newQuizpkg.save();
        res.status(201).json(savedQuizpkg);
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const getAllpkg = async (req, res) => {
    try {
        const quizpkg = await Quizpkg.find(); // Retrieve all schedules from the database
        res.status(200).json(quizpkg);
    } catch (error) {
        console.error('Error fetching schedule data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = {
    quizpkg,
    getAllpkg
};