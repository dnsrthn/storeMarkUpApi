import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("username").optional().isString().withMessage("Invalid username format"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at least 8 characters long"),
    validarCampos,
    handleErrors
]

export const showUserByIdValidator = [
    param("uid").isMongoId().withMessage("Invalid MongoDB ID"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("Invalid MongoDB ID"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    param("uid").isMongoId().withMessage("Invalid MongoDB ID"),
    param("uid").custom(userExists),
    body("newPassword").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    param("uid", "Invalid ID").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    param("uid").isMongoId().withMessage("Invalid MongoDB ID"),
    param("uid").custom(userExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]