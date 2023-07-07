import express from "express";
import multer from "multer";
import mime from "mime-types";
import path from "path";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./images");
    },
    filename: function (req, file, cb) {
      var fileExt = file.originalname.split(".").pop();
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random());
      cb(null, "UPLOADS" + "" + uniqueSuffix + "." + fileExt);
    },
    fileFilter: (req, file, cb) => {
      if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
      ){
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('only .png, .jpg format allowed!'))
      }
    },
    onError : function(err, next) {
      return console.log('error', err);
      next(err);
    }
  });

const upload = multer({ storage });
const update = multer({ storage });
const deleted = multer({ storage });

router.get('/users', verifyUser, getUsers);
router.get('/users/:id', verifyUser, getUserById);
router.post('/users', upload.any(), createUser);
router.patch('/users/:id', verifyUser, update.any(), updateUser);
router.delete('/users/:id', verifyUser, deleted.any(), deleteUser);

export default router;