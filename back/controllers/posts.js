const Post = require("../models/post");
const fs = require("fs");
const User = require("../models/user");

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  var post = null;
  if (req.file) {
      post = new Post({
          ...postObject,
          imageUrl: `${req.protocol}://${req.get("host")}/images-posts/${req.file.filename}`,
      });
  } else {
      post = new Post({
          ...postObject
      });
  }
  post.save()
  .then(() => res.status(201).json({ message: "La publication est enregistrée !" }))
  .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({_id: req.params.id})
  .then((post) => res.status(200).json(post))
  .catch((error) => res.status(404).json({error: error}));
};

exports.getAllPost = (req, res, next) => {
  const postsList = [];
    Post.find() 
    .then(async (posts) => {
      for(let i=0; i < posts.length; i++) {
        const post = posts[i];
        var userId = post.userId;
        var user = await User.findOne({_id: userId});
        postsList.push({
          post: post,
          user: {
            firstname: user.firstname,
            lastname: user.lastname,
            job: user.job,
            avatar: user.avatar,
            role: user.role,
          }
        });
      }
      return res.status(200).json(postsList);
    })
    .catch((error) => { res.status(400).json({error: error});
  });
};

exports.modifyPost = (req, res, next) => {
  var postObject = {}; 
  if (req.file) {
      postObject = {
          ...JSON.parse(req.body.post),
          imageUrl: `${req.protocol}://${req.get("host")}/images-posts/${req.file.filename}`,
      };
  } else {
      postObject = { ...JSON.parse(req.body.post) }; 
  }
  delete postObject._userId; 
  Post.findOne({_id: req.params.id}) 
  .then((post) => {
      Post.updateOne(
          {_id: req.params.id},
          {...postObject, _id: req.params.id})
      .then(() => {
          var imageUrl = post.imageUrl;
          if (postObject.imageUrl != null) { imageUrl = postObject.imageUrl; }
          res.status(200).json({ message: "Modification(s) effectuée(s)", imageUrl: imageUrl });
      })
      .catch((error) => res.status(400).json({ error }));
      })
  .catch((error) => { res.status(400).json({ error });
  });
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }) 
    .then((post) => {
      var filename;
      if (post.imageUrl != null) { 
        filename = post.imageUrl.split("/images-posts/")[1]; 
      }
      Post.deleteOne({ _id: req.params.id }) 
          .then(() => {
            if (filename != null) { 
              fs.unlink(`images-posts/${filename}`, () => {});
            }
            res.status(200).json({ message: "Publication supprimée !" });
          })
          .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likedPost = (req, res, next) => {
  console.log(req.params.id);
  Post.findOne({ _id: req.params.id })
  .then((post) => {
    console.log(post._id);
    if (!post.usersLiked.includes(req.auth.userId)) {
      Post.updateOne(
        { _id: req.params.id },
        { $inc: { likes: 1 }, $push: { usersLiked: req.auth.userId }}
      )
      .then(() => res.status(200).json({ message: "Vous avez liké la publication ! :)" }))
      .catch((error) => res.status(400).json({ error }));
    } 
    else {
      Post.updateOne(
      { _id: req.params.id },
      { $inc: { likes: -1 }, $pull: { usersLiked: req.auth.userId } } 
      )
      .then(() => res.status(200).json({ message: "Vous avez retiré un like à la publication ! :(" }))
      .catch((error) => res.status(400).json({ error }));
    }
});
};
