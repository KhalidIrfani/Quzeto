const express = require('express')
const bcrypt = require('bcryptjs');
const ErrorHandler = require('./middleware/error')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 8000;
const connectDatabase = require("./database/database");
const authRoute = require('./routes/auth')
const scheduleRoute = require('./routes/schedule');
const questionRoute = require('./routes/question')
const resultRoute = require('./routes/result');
const quizRoute = require('./routes/quizpkg')


connectDatabase()

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: ['https://quzeto-rq6e-qjx0ldmhg-khalidirfani.vercel.app',"https://quzeto-rq6e-qjx0ldmhg-khalidirfani.vercel.app/"],
        credentials: true
    })
);


app.use('/', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})



app.use('/api/auth', authRoute)
app.use('/api/question', questionRoute)
app.use('/api/schedule', scheduleRoute)
app.use('/api/result', resultRoute)
app.use('/api/quizpkg', quizRoute)

app.use(ErrorHandler)

module.exports = app;