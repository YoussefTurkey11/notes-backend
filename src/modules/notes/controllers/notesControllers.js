import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Note from "../models/Note.js";
import ApiError from "../../../utils/apiError.js";
import * as noteService from "../services/noteService.js";

export const getAllNotes = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;

  const notes = await noteService.getAllNotes({ page, limit });

  res.status(StatusCodes.OK).json({ result: notes.length, page, data: notes });
});

export const getSpecificNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notes = await noteService.getSpecificNote({ id });

  res.status(StatusCodes.OK).json({ data: notes });
});

export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const newNote = await noteService.createNote({ title, content });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "You've added new note", data: newNote });
});

export const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  const updatedNote = await noteService.updateNote({
    id,
    title,
    content,
  });

  res.status(StatusCodes.OK).json({ message: "You've updated a note" });
});

export const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedNote = await noteService.deleteNote({ id });

  res.status(StatusCodes.OK).json({ message: "You've deleted a note" });
});

export const deleteAllNotes = asyncHandler(async (_, res) => {
  const deletedNotes = await noteService.deleteAllNotes();

  res.status(StatusCodes.OK).json({ message: "You've deleted all notes" });
});
