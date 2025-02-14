import { Router } from "express";
import {showUsersById, getUsers, deleteUser, updatePassword, updateUser, updateProfilePicture} from "./user.controller.js";
import { showUsersByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.get("/findUser/:uid", showUsersByIdValidator, showUsersById);
router.get("/", getUsers);
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);
router.put("/updateUser/:uid", updateUserValidator, updateUser);


router.patch(
  "/updateProfilePicture/:uid",
  uploadProfilePicture.single("profilePicture"),
  updateProfilePictureValidator,
  updateProfilePicture
);

export default router;