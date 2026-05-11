import { check } from "express-validator";
import validatorMiddleware from "../../../middleware/validator.js";

export const getSpecificNoteValidator = [
  check("id").isMongoId().withMessage("Invalid Note Id"),

  validatorMiddleware,
];

export const createNoteValidator = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2 })
    .withMessage("Title must be more than 2 characters")
    .isLength({ max: 32 })
    .withMessage("Title must be less than 32 characters"),

  check("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 2 })
    .withMessage("Content must be more than 2 characters"),

  validatorMiddleware,
];

export const updateNoteValidator = [
  check("id").isMongoId().withMessage("Invalid Note Id"),

  check("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 32 })
    .withMessage("Title must be between 2 and 32 characters"),

  check("content")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Content must be more than 2 characters"),

  validatorMiddleware,
];

export const deleteNoteValidator = [
  check("id").isMongoId().withMessage("Invalid Note Id"),

  validatorMiddleware,
];
