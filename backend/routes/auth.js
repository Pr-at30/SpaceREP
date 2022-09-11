const express = require('express');
const router = express.Router();
const extractFile = require('../middlewares/file');

const {
    register,
    login,
    logout,
    myProfile,
    updateProfile,
    deleteProfile
} = require("../controllers/auth");
const { isAuthenticated } = require('../middlewares/auth');

router.route('/register').post(extractFile.single('profilePic'), register);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/update/profile').put(isAuthenticated, extractFile.single('profilePic'), updateProfile);

router.route('/delete/myprofile').delete(isAuthenticated, extractFile.single('profilePic'), deleteProfile);

router.route('/myprofile').get(isAuthenticated, myProfile);

module.exports = router;