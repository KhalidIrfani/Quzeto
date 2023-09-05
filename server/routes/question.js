const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { questions, fillInBlanks, getAllQuestions } = require('../controller/question'); // Make sure this path is correct
const router = express.Router();

router.post('/question', isAuthenticated, questions);
router.post('/blanks', isAuthenticated, fillInBlanks);
router.get('/questions/:questionId', getAllQuestions);




module.exports = router;