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
    /*.then(() => {
      console.log(postsList);
      return res.status(200).json(postsList);
    })*/
    .catch((error) => { res.status(400).json({error: error});
  });
};

/*exports.getAllPost = (req, res, next) => {
    Post.find() 
    .then((posts) => { res.status(200).json(posts);})
    .catch((error) => { res.status(400).json({error: error});
    });
};*/

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
            const filename = post.imageUrl.split("/images-posts/")[1];
            Post.deleteOne({ _id: req.params.id }) 
                .then(() => {
                    fs.unlink(`images-posts/${filename}`, () => {});
                    res.status(200).json({ message: "Publication supprimée !" });
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

/* exports.likedSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (req.body.like == 1 && !sauce.usersLiked.includes(req.body.userId)) {
    Sauce.updateOne(
    { _id: req.params.id },
    {
      $inc: { likes: 1 }, (l'opérateur $inc incrémente un champ d'une valeur spécifiée) on lui ajoute 1 like et on push l'id de l'utilisateur qui a liké dans la sauce 
      $push: { usersLiked: req.body.userId },
    }
    // console.log(Sauce.usersLiked)
  )
    .then(() =>
      res.status(200).json({ message: "Vous avez liké la sauce ! :)" })
    )
    .catch((error) => res.status(400).json({ error }));
} else if (req.body.like == -1 && !sauce.usersDisliked.includes(req.body.userId)) {
  Sauce.updateOne(
    { _id: req.params.id },
    {
      $inc: { dislikes: 1 },
      $push: { usersDisliked: req.body.userId },
    } 
  )
    .then(() =>
      res.status(200).json({ message: "Vous avez disliké la sauce ! :(" })
    )
    .catch((error) => res.status(400).json({ error }));
} else {
  if (sauce.usersLiked.includes(req.body.userId)) {
    Sauce.updateOne(
      {
        _id: req.params.id,
      },
      {
        $inc: { likes: -1 },
        $pull: { usersLiked: req.body.userId },
      } 
    )
      .then(() =>
        res.status(200).json({ message: "Vous avez disliké la sauce ! :(" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else if (sauce.usersDisliked.includes(req.body.userId)) {
    Sauce.updateOne(
      {
        _id: req.params.id,
      },
      {
        $inc: { dislikes: -1 },
        $pull: { usersDisliked: req.body.userId },
      } 
    )
      .then(() =>
        res.status(200).json({ message: "Vous avez disliké la sauce ! :(" })
      )
      .catch((error) => res.status(400).json({ error }));
  }
}
});
};
*/