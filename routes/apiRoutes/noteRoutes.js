const router = require("express").Router();
const {
  filterByQuery,
  createNewNote,
  validateNote,
  findById,
} = require("../../lib/notes");
const { notes } = require("../../db/notes");



// get all
router.get("/notes", (req, res) => {
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// find by Id
router.get("/notes/:id", (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// create new note
router.post("/notes", (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send("the note is not properly formatted.");
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;

