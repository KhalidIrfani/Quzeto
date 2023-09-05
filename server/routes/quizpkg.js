const express = require('express');
const { quizpkg, getAllpkg } = require('../controller/quizpkg');
const router = express.Router();

router.post('/quizpackages', quizpkg)
router.get('/getAllpkg', getAllpkg)


module.exports = router;