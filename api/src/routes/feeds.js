const express = require("express");
const router = express.Router();
const { deleteFeed } = require("./middlewares/feed/deleteFeed");
const { putFeed } = require("./middlewares/feed/putFeed");
const { postFeed } = require("./middlewares/feed/postFeed");
const { getFeed } = require("./middlewares/feed/getFeed");
const authorization = require("./middlewares/user/authorization");

router.post("/", authorization, postFeed);

router.put("/", authorization, putFeed);

router.delete("/:id", authorization, deleteFeed);

router.get("/", authorization, getFeed);

module.exports = router;
