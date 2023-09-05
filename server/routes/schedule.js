const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { createSchedule, getSchedule, updateTotalParticipant, getScheduleById, deleteSchedule, updateSchedule, getSingle, registerQuiz, checkregisterquiz } = require('../controller/schedule');
const router = express.Router();

router.post('/createSchedule', isAuthenticated, createSchedule)
router.get('/getSchedule', getSchedule)
router.get('/getSchedules/:id', getSingle)
router.post('/updateTotalParticipant', updateTotalParticipant);
router.get('/:scheduleId', getScheduleById);
router.delete('/delete/:scheduleId', deleteSchedule)
router.put('/update/:scheduleId', updateSchedule)
router.post('/registerQuiz', registerQuiz)
router.get('/checkregisterquiz/:quizId/:userId',checkregisterquiz)

module.exports = router;