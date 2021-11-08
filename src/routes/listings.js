const { Router } = require("express");
const Joi = require("joi");
const multer = require("multer");
const config = require("config");

const store = require("../store/listings");
const validateWith = require("../middleware/validation");
const validateCategoryId = require("../middleware/validateCategoryId");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const listingMapper = require("../mappers/listings");

const router = Router();

const upload = multer({
  dest: "uploads/",
  limits: {
    fieldSize: 25 * 1024 * 1024,
  },
});

const schema = {
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  categoryId: Joi.number().required().min(1),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
};

router.get("/", (req, res) => {
  const listings = store.getListings();
  const resources = listings.map(listingMapper);
  res.send(resources);
});

router.get("/:id", auth, (req, res) => {
  const listing = store.getListing(parseInt(req.params.id));
  if (!listing) return res.status(404).send();
  const resource = listingMapper(listing);
  res.send(resource);
});

router.post(
  "/",
  auth,
  upload.array("images", config.get("maxImageCount")),
  validateWith(schema),
  validateCategoryId,
  imageResize,
  async (req, res) => {
    const listing = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      categoryId: parseInt(req.body.categoryId),
      description: req.body.description,
    };

    listing.images = req.images.map((fileName) => ({ fileName: fileName }));

    if (req.body.location) {
      listing.location = JSON.parse(req.body.location);
    }

    if (req.user) {
      listing.userId = req.user.userId;
    }

    store.addListing(listing);

    res.status(201).send(listing);
  }
);

module.exports = router;
