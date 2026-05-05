import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "This field is required"],
      unique: true,
      minLength: [2, "This field must be more than 2 characters"],
      maxLength: [32, "This field must be less than 32 characters"],
    },
    content: {
      type: String,
      required: [true, "This field is required"],
      minLength: [2, "This field must be more than 2 characters"],
    },
  },
  { timestamps: true },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
