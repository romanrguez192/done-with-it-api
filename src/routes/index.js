const { Router } = require("express");

const categories = require("./categories");
const listings = require("./listings");
const users = require("./users");
const auth = require("./auth");
const me = require("./me");
const messages = require("./messages");
const expoPushTokens = require("./expoPushTokens");

const router = Router();

router.use("/categories", categories);
router.use("/listings", listings);
router.use("/users", users);
router.use("/auth", auth);
router.use("/me", me);
router.use("/expoPushTokens", expoPushTokens);
router.use("/messages", messages);

module.exports = router;
