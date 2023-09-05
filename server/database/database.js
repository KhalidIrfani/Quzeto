const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) => {
        console.log(`mongod connect with server: ${data.connection.host}`);
    })
}
module.exports = connectDatabase