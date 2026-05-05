import express from "express";
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

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes API
 */

/**
 * @swagger
 * /api/v1/notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: List of notes
 */
router.route("/").get(getAllNotes);

/**
 * @swagger
 * /api/v1/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: "#/components/schemas/Note"
 *     responses:
 *       201:
 *         description: Note created successfully
 */
router.route("/").post(createNoteValidator, createNote);

/**
 * @swagger
 * /api/v1/notes:
 *   delete:
 *     summary: Delete all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: All notes deleted
 */
router.route("/").delete(deleteAllNotes);

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   get:
 *     summary: Get specific note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note data
 */
router.route("/:id").get(getSpecificNoteValidator, getSpecificNote);

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   patch:
 *     summary: Update note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 */
router.route("/:id").patch(updateNoteValidator, updateNote);

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   delete:
 *     summary: Delete note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted
 */
router.route("/:id").delete(deleteNoteValidator, deleteNote);

export default router;
