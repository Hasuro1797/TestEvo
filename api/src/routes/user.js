const express = require('express');
const router = express.Router();
const { postUserRegister } = require('./middlewares/user/postUserRegister');
const { postUserLogIn } = require('./middlewares/user/postUserLogIn');



router.post('/register', postUserRegister);

router.post('/login', postUserLogIn) 


module.exports = router;