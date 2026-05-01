import Note from "../models/Note.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";

export const getAllNotes = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const notes = await Note.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  res.status(200).json({ result: notes.length, page, data: notes });
});

export const getSpecificNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notes = await Note.findById(id);

  if (!notes) next(new ApiError(`No Category found for this id: ${id}`, 404));

  res.status(200).json({ data: notes });
});

export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const newNote = await Note.create({ title, content });
  res.status(201).json({ message: "You've added new note", data: newNote });
});

export const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const updatedNote = await Note.findByIdAndUpdate(
    { _id: id },
    { title, content },
  );

  if (!updatedNote)
    next(new ApiError(`No Category found for this id: ${id}`, 404));

  res.status(200).json({ message: "You've updated a note" });
});

export const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Note.findByIdAndDelete({ _id: id });

  if (!deletedNote)
    next(new ApiError(`No Category found for this id: ${id}`, 404));

  res.status(200).json({ message: "You've deleted a note" });
});

export const deleteAllNotes = asyncHandler(async (_, res) => {
  const deletedNotes = await Note.deleteMany({});

  if (!deletedNotes)
    next(new ApiError(`No Category found for this id: ${id}`, 404));

  res.status(200).json({ message: "You've deleted all notes" });
});
