const express = require("express"); 
const auth = require("../middleware/auth"); 
const router = express.Router(); 
const postsCtrl = require("../controllers/posts"); 
const multer = require("../middleware/multer-config-post"); 

router.post("/posts", auth, multer, postsCtrl.createPost); 
router.get("/posts/:id", auth, postsCtrl.getOnePost);
router.get("/posts", auth, postsCtrl.getAllPost); 
router.put("/posts/:id", auth, multer, postsCtrl.modifyPost); 
router.delete("/posts/:id", auth, postsCtrl.deletePost);
router.put("/posts/likes/:id", auth, postsCtrl.likedPost);
router.put("/posts/comments/:id", auth, postsCtrl.commentedPost);
router.delete("/posts/:idPost/comments/:idComment", auth, postsCtrl.deleteComment);

module.exports = router; 