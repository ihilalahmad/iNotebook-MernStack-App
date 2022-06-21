const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    title: "this is the title of note",
    description: "this is the default description of note",
    tag: "this is the tag of this note",
  };
  res.json(obj);
});

module.exports = router;
