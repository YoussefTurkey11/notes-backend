import { StatusCodes } from "http-status-codes";
import Note from "../models/Note.js";
import ApiError from "../utils/apiError.js";

export const getAllNotes = async ({ page, limit }) => {
  const skip = (page - 1) * limit;

  const notes = await Note.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return notes;
};

export const getSpecificNote = async ({ id, next }) => {
  const notes = await Note.findById(id);

  if (!notes)
    next(
      new ApiError(`No note found for this id: ${id}`, StatusCodes.NOT_FOUND),
    );

  return notes;
};

export const createNote = async ({ title, content }) => {
  const newNote = await Note.create({ title, content });
  return newNote;
};

export const updateNote = async ({ id, title, content, next }) => {
  const updatedNote = await Note.findByIdAndUpdate(
    { _id: id },
    { title, content },
    { new: true },
  );

  if (!updatedNote)
    next(
      new ApiError(`No note found for this id: ${id}`, StatusCodes.NOT_FOUND),
    );
  return updatedNote;
};

export const deleteNote = async ({ id, next }) => {
  const deletedNote = await Note.findByIdAndDelete({ _id: id }, { new: true });

  if (!deletedNote)
    next(
      new ApiError(`No note found for this id: ${id}`, StatusCodes.NOT_FOUND),
    );
  return deletedNote;
};

export const deleteAllNotes = async ({ next }) => {
  const deletedNotes = await Note.deleteMany({});

  if (!deletedNotes) next(new ApiError(`No note found`, StatusCodes.NOT_FOUND));
  return deletedNotes;
};
