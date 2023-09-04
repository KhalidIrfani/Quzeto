const jwt = require('jsonwebtoken')
const sendToken = (user, statusCode, resp) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(Date.now() + 100000 * 60 * 1000), // 10 minutes
        httpOnly: true,
    }
    resp.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
    // console.log(token)
}


module.exports = sendToken;