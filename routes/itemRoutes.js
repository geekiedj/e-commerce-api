const express = require("express");
const router = express.Router();
const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  // searchItems,
} = require("../controllers/itemController");

// router.get("/items", getAllItems);
// router.post("/items", createItem);
// router.get("/items/:id", getItem);
// router.patch("/items/:id", updateItem);
// router.delete("items/:id", deleteItem);
router.route("/items").get(getAllItems).post(createItem);
router.route("/items/:id").get(getItem).patch(updateItem).delete(deleteItem);
// router.get("/search", searchItems);

module.exports = router;
