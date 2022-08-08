const Post = require("../models/post");
const fs = require("fs");

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