import express from "express";
import fetchUser from "../middleware/fetchUser.js";
import Notes from "../models/Notes.js";

const router = express.Router();

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("internal serveer error");
  }
});

router.post("/addnote", fetchUser, async (req, res) => {
  try {
    //* data comimg from body(frontend)
    const { title, description, tag } = req.body;

    //* validation
    if (!title || !description || !tag) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //* Notes
    const notes = new Notes({ title, description, tag, user: req.userId });

    //* saving notes
    const savedNote = await notes.save();
    res.json({savedNote, success : "Note added successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  const { id } = req.params;

  try {
    const note = await Notes.findById({ _id: id });

    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.userId) {
      return res.status(401).send("not allowed");
    }

    console.log(note);

    const notes = await Notes.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          description,
          tag,
        },
      },
      { new: true }
    );

    res.json({ notes, success: "Notes updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("not found");
    }

    if (note.user.toString() !== req.userId) {
      return res.status(401).send("not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note has been deleted", note: note });


  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

router.get('/notes/:id' ,fetchUser ,async (req,res) => {

    try {

        const {id} =req.params
        const notes = await Notes.findById({ _id : id})
        console.log(notes);

        if (notes) {
            return res.status(200).json(notes);
        } else {
            return res.status(404).json({ success: "notes Not Found" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("internal serevr error")
    }
})
export default router;
