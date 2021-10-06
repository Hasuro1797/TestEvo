const express = require('express');
const router = express.Router();
const { postUserRegister } = require('./middlewares/user/postUserRegister');
const { postUserLogIn } = require('./middlewares/user/postUserLogIn');
const postVerify = require('./middlewares/user/postVerify');
const authorization  = require('./middlewares/user/authorization');



router.post('/register', postUserRegister);

router.post('/login', postUserLogIn) 

router.get('/', authorization, postVerify)

module.exports = router;