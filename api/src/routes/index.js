const { Router } = require('express');
const feeds = require('./feeds');
const user = require('./user');
const router = Router();


router.use('/feeds', feeds);
router.use('/user',user);



module.exports = router;
