const express = require('express');
const { registerController, loginUser, getUser, updateUser, profilePic, logOut, getalluser, deleteUser, getSingleuser } = require('../controller/user');
const { isAuthenticated } = require('../middleware/auth');
const { upload } = require('../multer');
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginUser);
router.get('/getuser', isAuthenticated, getUser)
router.get('/getalluser', getalluser)
router.get('/getSingleuser/:id', getSingleuser)
router.delete('/deleteUser/:id', deleteUser)
router.put('/updateUser', updateUser)
router.put('/profile', isAuthenticated, upload.single('image'), profilePic)
router.get('/logout', logOut)

module.exports = router;