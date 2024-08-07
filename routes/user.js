const express = require("express");
const { handleUsersignUp, handleUserLogIn } = require("../controller/user");

const router = express.Router();

router.post('/',handleUsersignUp)
router.post('/login',handleUserLogIn)

module.exports = router;