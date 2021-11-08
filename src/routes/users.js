const { Router } = require("express");
const Joi = require("joi");

const auth = require("../middlewares/auth");
const usersStore = require("../store/users");
const listingsStore = require("../store/listings");
const validateWith = require("../middlewares/validation");

const router = Router();

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.get("/", (req, res) => {
  const users = usersStore.getUsers();
  res.send(users);
});

router.get("/:id", auth, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = usersStore.getUserById(userId);

  if (!user) {
    return res.status(404).send();
  }

  const listings = listingsStore.filterListings((listing) => listing.userId === userId);

  res.send({
    id: user.id,
    name: user.name,
    email: user.email,
    listings: listings.length,
  });
});

router.post("/", validateWith(schema), (req, res) => {
  const { name, email, password } = req.body;

  if (usersStore.getUserByEmail(email)) {
    return res.status(400).send({ error: "A user with the given email already exists." });
  }

  const user = { name, email, password };
  usersStore.addUser(user);

  res.status(201).send(user);
});

module.exports = router;
