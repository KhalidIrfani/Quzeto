const express = require('express');
const User = require('../model/user');
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../utils/ErrorHandler.js')
const sendToken = require('../utils/JwtToken');
const fs = require('fs');
const path = require('path');

// Register User
const registerController = async (req, res, next) => {
    try {

        const { firstName, middleName, lastName, userName, email, password, confirmPassword, address, city, state,  } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return next(new ErrorHandler("User already exists", 400));
        }

        const user = new User({
            firstName,
            middleName,
            lastName,
            userName,
            email,
            password,
            confirmPassword,
            address,
            city,
            state
        });
        await user.save();

        res.status(201).json({
            success: true,
            message: `User registered successfully!`,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

// Login User
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler('Please provide all fields!', 400));
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorHandler("User doesn't exist", 404)); // Use 404 for "Not Found"
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return next(new ErrorHandler("Incorrect email or password", 401)); // Use 401 for "Unauthorized"
        }

        // If the email and password are correct, send the token
        sendToken(user, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};

// get All User
const getalluser = async (req, res, next) => {

    try {
        const user = await User.find();
        if (!user) {
            return next(new ErrorHandler("User doesn't exist", 400));
        }
        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return next(new ErrorHandler(error.message, 500));
    }
}

// getUser for login
const getUser = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return next(new ErrorHandler("User doesn't exist", 400));
        }
        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return next(new ErrorHandler(error.message, 500));
    }
});


// get user for update

const getSingleuser = async (req, res) => {
    try {
        const userId = req.params.id; // Make sure you're extracting the user ID correctly
        const user = await User.findById(userId);
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// update User
const updateUser = async (req, res, next) => {
    try {
        const { firstName, lastName, userName, email, confirmPassword, newPassword, address, city, state } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("User not found", 400));
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.userName = userName;
        user.email = email;
        user.address = address;
        user.city = city;
        user.state = state;


        await user.save();

        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

}


// Delete User
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const users = await User.findById(userId);
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }
        await users.deleteOne();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Profile pic
const profilePic = async (req, res, next) => {
    try {
        const existsUser = await User.findById(req.user._id);

        if (!existsUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (req.file) {
            // Check if the user has a profile picture to delete
            if (existsUser.avatar) {
                const existAvatarPath = path.join('uploads', existsUser.avatar);
                fs.unlinkSync(existAvatarPath);
            }

            const fileUrl = req.file.filename;
            existsUser.avatar = fileUrl;
            await existsUser.save();

            return res.status(200).json({
                success: true,
                user: existsUser,
            });
        } else {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};


// logout
const logOut = async (req, res, next) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0),
            // httpOnly: true,
        });
        res.status(201).json({
            success: true,
            message: "Logout Sucessful!"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 5000))
    }
}



module.exports = {
    registerController,
    loginUser,
    getUser,
    getalluser,
    getSingleuser,
    updateUser,
    deleteUser,
    profilePic,
    logOut
};

