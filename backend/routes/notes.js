const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const { json } = require("express");

//ROUTE 1: Get all the notes using GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 2: Add a new note using POST "/api/notes/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3: Update an existing note using PUT "/api/notes/updatenote/:id". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //creating newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and update it.
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not found");
    }

    console.log(note.user);

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 4: Delete an existing note using DELETE "/api/notes/deletenote/:id". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    //Allow deletion if this user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
