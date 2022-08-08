const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require('cors');
const dotenv = require('dotenv'); 
dotenv.config(); 

app.use(cors()); 
app.use(express.json());

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const myAccount = process.env.account;
const myMdp = process.env.mdp; 
const myDatabase = process.env.database; 

mongoose.connect(
        `mongodb+srv://${myAccount}:${myMdp}@${myDatabase}.mongodb.net/?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !")); 

app.use("/avatars", express.static(path.join(__dirname, "avatars"))); 
app.use("/images-posts", express.static(path.join(__dirname, "images-posts"))); 
app.use("/api/auth", userRoutes);
app.use("/api/auth", postRoutes); 

module.exports = app;
