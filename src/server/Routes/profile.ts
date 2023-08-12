import authUser from "../Middlewares/authUser";

const { Router } = require('express');
const profileControlleur = require('../Controlleurs/profileControlleur');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        const uploadPath = path.join(__dirname, "../public/Images");
        // Check if the directory exists, and create it if it doesn't
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
});

const router = Router();

router.post('/uploadImg', upload.single('file'), authUser, profileControlleur.saveImg);
router.get('/getImg',authUser,profileControlleur.getImg)

module.exports = router;