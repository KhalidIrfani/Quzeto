const express = require('express');
const Question = require('../model/question');

// Create Mcq's
const questions = async (req, res, next) => {
  try {
    const { question, correctAnswer, options, type, subject } = req.body;
    const userId = req.user._id;
    // Check if a question with the same content already exists
    const existingQuestion = await Question.findOne({ question, type, subject });

    if (existingQuestion) {
      return res.status(400).json({ error: 'Question with the same content already exists' });
    }

    const newQuestion = new Question({
      question,
      correctAnswer,
      options,
      type,
      subject,
      createdBy: userId,
    });

    await newQuestion.save();

    res.status(201).json({ message: 'Question saved successfully' });
  } catch (error) {
    console.log('Error saving question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Create Fill in blanks
const fillInBlanks = async (req, res, next) => {
  try {
    const { question, correctAnswer, type, subject } = req.body;
    const userId = req.user._id;

    // Check if a question with the same content already exists
    const existingQuestion = await Question.findOne({ question, type, subject });

    if (existingQuestion) {
      return res.status(400).json({ error: 'Question with the same content already exists' });
    }

    const newBlanks = new Question({
      question,
      correctAnswer,
      type,
      subject,
      createdBy: userId,
    });

    await newBlanks.save();

    res.status(201).json({ message: 'Question saved successfully' });
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get All Questions
const getAllQuestions = async (req, res, next) => {
  try {
    const regularQuestions = await Question.find(); // Adjust the type as needed
    res.status(200).json(regularQuestions);

  } catch (error) {
    console.error('Error fetching regular questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  questions,
  fillInBlanks,
  getAllQuestions,

};
