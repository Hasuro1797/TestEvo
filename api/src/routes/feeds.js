const express = require('express');
const router = express.Router();
const { deleteFeed } = require('./middlewares/feed/deleteFeed');
const { putFeed } = require('./middlewares/feed/putFeed');
const { postFeed } = require('./middlewares/feed/postFeed');
const { getFeed } = require('./middlewares/feed/getFeed');


router.post('/', postFeed);

router.put('/',putFeed);

router.delete('/', deleteFeed);

router.get('/', getFeed)


module.exports = router;