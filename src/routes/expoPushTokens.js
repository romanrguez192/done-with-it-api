const { Router } = require("express");
const Joi = require("joi");

const usersStore = require("../store/users");
const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");

const router = Router();

const schema = {
  token: Joi.string().required(),
};

router.post("/", auth, validateWith(schema), (req, res) => {
  const user = usersStore.getUserById(req.user.userId);

  if (!user) {
    return res.status(400).send({ error: "Invalid user." });
  }

  user.expoPushToken = req.body.token;

  res.status(201).send();
});

module.exports = router;
