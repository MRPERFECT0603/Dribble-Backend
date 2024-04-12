const { register , create, sendMail } = require("../Controllers/userControllers");
const express = require("express");


const router = express.Router();

router.post("/register", register);
router.post("/create", create);
router.post("/sendmail", sendMail);




module.exports = router;