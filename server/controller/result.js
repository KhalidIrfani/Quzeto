const express = require('express');
const Answer = require('../model/result');
const Question = require('../model/question');


// Submit the result
const submitResult = async (req, res) => {
    try {
        const {
            userId,
            quizId,
            questions,
            score,
            totalQuestions,
            totalWrongAnswers,
            correctAnswer
        } = req.body;

        // Check if a quiz result already exists for the given user and quiz
        const existingResult = await Answer.findOne({ userId, quizId });

        if (existingResult) {
            // Update the existing quiz result
            existingResult.questions = questions;
            existingResult.score = score;
            existingResult.attemptedQuestion = questions.length;
            existingResult.totalQuestions = totalQuestions;
            existingResult.totalWrongAnswers = totalWrongAnswers;
            existingResult.correctAnswer = correctAnswer;

            await existingResult.save();

            res.status(200).json({ message: 'Quiz result updated successfully', _id: existingResult._id });
        } else {
            // Create a new quiz result
            const answer = new Answer({
                userId: userId,
                quizId: quizId,
                questions: questions,
                score, // Number of correct answers
                attemptedQuestion: questions.length,
                totalQuestions,
                totalWrongAnswers,
                correctAnswer
            });

            await answer.save();

            res.status(201).json({ message: 'Quiz result stored successfully', _id: answer._id });
        }
    } catch (error) {
        console.error('Error storing/updating quiz result:', error);
        res.status(500).json({ error: 'An error occurred while storing/updating the quiz result' });
    }
};

// get result
const getResults = async (req, res) => {
    try {
        const answer = await Answer.find().populate('quizId');

        if (!answer) {
            return res.status(404).json({ message: 'Game result not found' });
        }

        res.json(answer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get  result by resultId
const getResult = async (req, res) => {
    try {
        const resultId = req.params.id;
        const answer = await Answer.findById(resultId).populate('quizId');

        if (!answer) {
            return res.status(404).json({ message: 'Game result not found' });
        }

        res.json(answer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// get result by userId
const result = async (req, res) => {
    try {
        const Id = req.params.id
        const result = await Answer.find({ userId: Id }).populate('quizId');
        if (!result) {
            return res.status(404).json({ message: 'Game result not found' });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { submitResult, getResult, result, getResults };
