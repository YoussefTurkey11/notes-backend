import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "This field is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "This field is required"],
      lowercase: true,
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,
      required: [true, "This field is required"],
      minLength: [6, "This field must be more than 6 characters"],
      maxLength: [32, "This field must be less than 32 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
