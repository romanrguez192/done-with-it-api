const { Router } = require("express");

const categories = require("./categories");
const listings = require("./listings");
const users = require("./users");
const auth = require("./auth");
const me = require("./me");
const messages = require("./messages");
const expoPushTokens = require("./expoPushTokens");

const router = Router();

app.use("/categories", categories);
app.use("/listings", listings);
app.use("/users", users);
app.use("/auth", auth);
app.use("/me", me);
app.use("/expoPushTokens", expoPushTokens);
app.use("/messages", messages);

router.use();
