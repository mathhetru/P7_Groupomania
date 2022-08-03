const express = require('express'); 
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);
router.get("/user/:id", auth, userCtrl.getOneUser); 

module.exports = router; 