const Item = require("../models/Item");

//get all items
const getAllItems = async (req, res) => {
  try {
    //fetch item from database
    const items = await Item.find();
    //respond with items from db as json
    res.json(items);
  } catch (error) {
    // Handle error if any
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get single item
const getItem = async (req, res) => {
  const { id: itemID } = req.params;
  const item = await Item.findOne({ _id: itemID });
  if (!item) {
    return res.status(404).json({ msg: `No item with id : ${itemID}` });
  }
  res.status(200).json({ item }); //res.send("get single task")
};

//add item
const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({ item });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//update item
const updateItem = async (req, res) => {
  try {
    const { id: itemID } = req.params;
    const item = await Item.findOneAndUpdate({ _id: itemID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      res.status(404).json({ item });
    }
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ msg: error }); //res.send("update task")
  }
};

//delete item

const deleteItem = async (req, res) => {
  try {
    const { id: itemID } = req.params;
    const item = await Item.findOneAndDelete({ _id: itemID });

    if (!item) {
      res.status(404);
    }
    res.status(200).json({ msg: "Nice...Item deleted!." });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// const searchItems = async (req, res) => {
//   try {
//     //get keyword from db
//     const keyword = req.query.keyword;
//     //search operation based on keyword-mongo search text feature
//     const items = await Item.find({ $text: { $search: keyword } });
//     res.status(200).json({ items });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
// //   }
// };

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  // searchItems,
};
