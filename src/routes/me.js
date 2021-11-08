const { Router } = require("express");

const listingsStore = require("../store/listings");
const auth = require("../middleware/auth");
const listingMapper = require("../mappers/listings");

const router = Router();

router.get("/listings", auth, (req, res) => {
  const listings = listingsStore.filterListings((listing) => listing.userId === req.user.userId);

  const resources = listings.map(listingMapper);

  res.send(resources);
});

module.exports = router;
