const express = require('express');
const Users = require('../controllers/Users');
const fileUpload = require('../utils/fileUpload');
const router = express.Router();

router.post('/create-user', fileUpload("./public/images"), Users.createUser);

module.exports = router;