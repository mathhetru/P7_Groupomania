const express = require('express'); 
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require('../controllers/user');
const multer = require("../middleware/multer-config-avatar");

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);
router.get("/user/:id", auth, userCtrl.getOneUser); 
router.put("/user/:id", auth, multer, userCtrl.modifyUser); 

module.exports = router; 