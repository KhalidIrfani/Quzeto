const express = require('express');
const { submitResult, getResult, result, getResults } = require('../controller/result');
const router = express.Router();

router.post('/submitAnswer', submitResult)
router.get('/getResults', getResults)
router.get('/getResult/:id', getResult)
router.get('/result/:id', result)



module.exports = router;