const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('./catchAsyncError.js');
const jwt = require("jsonwebtoken");
const User = require('../model/user');

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login to continue', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decoded.id);
        // console.log(user)

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        req.user = user; // Attach the user to req.user
        next();
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler('Invalid token', 401));

    }
});
