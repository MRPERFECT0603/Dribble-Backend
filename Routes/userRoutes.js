const { register , create, sendMail, userDescription } = require("../Controllers/userControllers");
const express = require("express");


const router = express.Router();

router.post("/register", register);
router.post("/create", create);
router.post("/sendmail", sendMail);
router.post("/desc", userDescription);





module.exports = router;