import { check } from "express-validator";
import validatorMiddleware from "../../../middleware/validator.js";

export const getSpecificNoteValidator = [
  check("id").isMongoId().withMessage("Invalid Note Id"),
  validatorMiddleware,
];

export const createNoteValidator = [
  check("title")
    .notEmpty()
    .withMessage("This field is required")
    .isLength({ min: 2 })
    .withMessage("This field must be more than 2 characters")
    .isLength({ max: 32 })
    .withMessage("This field must be less than 32 characters"),
  check("content")
    .notEmpty()
    .withMessage("This field is required")
    .isLength({ min: 2 })
    .withMessage("This field must be more than 2 characters"),
  validatorMiddleware,
];

export const updateNoteValidator = [
  check("id").isMongoId().withMessage("Invalid Note Id"),
  validatorMiddleware,
];
export const deleteNoteValidator = [
  check("id").isMongoId().withMessage("Invalid Note Id"),
  validatorMiddleware,
];
