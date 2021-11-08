const categoriesStore = require("../store/categories");

const validateCategoryId = (req, res, next) => {
  if (!categoriesStore.getCategory(parseInt(req.body.categoryId))) {
    return res.status(400).send({ error: "Invalid categoryId." });
  }

  next();
};

module.exports = validateCategoryId;
