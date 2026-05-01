import e from "express";
import {
  createNote,
  deleteAllNotes,
  deleteNote,
  getAllNotes,
  getSpecificNote,
  updateNote,
} from "../controllers/notesControllers.js";
import {
  createNoteValidator,
  deleteNoteValidator,
  getSpecificNoteValidator,
  updateNoteValidator,
} from "../utils/validations/noteValidator.js";

const router = e.Router();

router
  .route("/")
  .get(getAllNotes)
  .post(createNoteValidator, createNote)
  .delete(deleteAllNotes);

router
  .route("/:id")
  .get(getSpecificNoteValidator, getSpecificNote)
  .patch(updateNoteValidator, updateNote)
  .delete(deleteNoteValidator, deleteNote);

export default router;
