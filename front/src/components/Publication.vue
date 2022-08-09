<template>
    <div class="create-post" v-show="modification">
        <div class="create-post-window">
            <div class="create-post-top">
                <p class="create-post-top__title">Modifier votre publication</p>
                <fontAwesome icon="close" @click="modifyPublication" class="create-post-top__close"/>
            </div>
            <span class="create-post-line"></span>
            <form>
                <div class="create-post-middle" aria-label="Fenetre créer une publication">
                    <textarea v-model="modifyPostContent" placeholder="Votre publication..." name="content-text" rows="2" class="create-post-middle__text" aria-label="Ecrire son texte ici"></textarea>
                    <div @click="modifyPublicationPic" class="create-post-middle-btn">
                        <input type="file" aria-label="bouton ajouter une image" class="create-post-middle-input" @change="handleFileUpload">
                        <fontAwesome icon="camera" class="create-post-middle-btn__icon"/>
                        <p class="create-post-middle-btn__title">Ajouter une image</p>
                    </div>
                    <button aria-label="bouton ajouter une vidéo youtube" class="create-post-middle-btn">
                        <fontAwesome icon="circle-play" class="create-post-middle-btn__icon"/>
                        <p class="create-post-middle-btn__title">Modifier la vidéo via Youtube</p>
                    </button>
                </div>
                <span class="create-post-line"></span>
                <div class="create-post-bottom">
                    <button type="submit" name="publication" id="publication" class="create-post-bottom-btn">Publier</button>
                </div>
            </form>
        </div>
    </div>
    <div v-if="messages.length == 0" class="nothing">Il n'y a pas de publications pour l'instant !</div>
    <div v-else="messages.length != 0" v-for="message in messages" :key="message.id" class="post">
        <div class="post-top">
            <RouterLink to="/profil" class="post-photoprofil">
                <img :src="avatar" alt="photo-profil" class="post-photoprofil__img"/>
            </RouterLink>
            <div class="post-informations">
                <RouterLink to="/profil" class="post-name">{{ firstname }} {{ lastname }}</RouterLink>
                <p class="post-titre-poste">{{ job }}</p>
                <p class="post-date">{{ message.date }}</p>
            </div>
        </div>
        <div class="post-modsup">
            <p @click="modifyPublication" class="post-modifier">Modifier</p>
            <p class="post-supprimer">Supprimer</p>
        </div>
        <div class="post-middle">
            <div class="post-middle-content">
                <p class="post-middle__text">{{ message.content }}</p>
                <div v-if="message.imageUrl" class="post-middle-content-pict">
                    <img :src="message.imageUrl" alt="photo-publication" class="post-middle-content-pict__img"/>
                </div>
            </div>
        </div>
        <div class="post-middle-like-comment">
            <div class="post-middle-like">
                <fontAwesome icon="thumbs-up" class="post-middle-like__icon"/>
                <p class="post-middle-like__number">{{ message.likes }}</p>
            </div>
            <div class="post-middle-comment">
                <p class="post-middle-comment__number">56</p>
                <fontAwesome icon="message" class="post-middle-like__icon"/>
            </div>
        </div>
        <textarea rows="1" name="commentaire" id="commentaire" class="post-bottom__input" placeholder="Ajouter un commentaire" aria-label="Ajouter votre commentaire"></textarea>
        <div class="post-comment">
            <RouterLink to="/profil" class="post-photoprofil">
                <img src="../assets/photoprofil.jpg" alt="photo-profil" class="post-photoprofil__img"/>
            </RouterLink>
            <div class="post-comment-insertgrey">
                <div class="comment-supp">
                    <p class="comment-supprimer">Supprimer</p>
                </div>
                <RouterLink to="/profil" class="post-comment__name">Aurélien Dehaine</RouterLink>
                <p class="post-comment__text">Magnifique témoignage ; si illustrant, si vrai... si courageux et fort.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore voluptatibus fugit eaque illo nesciunt architecto odio ipsa numquam omnis magni! Ad sunt illo provident voluptatibus. Excepturi suscipit autem ab magnam?
                </p>
            </div>
        </div>
        <div class="post-comment">
            <RouterLink to="/profil" class="post-photoprofil">
                <img src="../assets/photoprofil.jpg" alt="photo-profil" class="post-photoprofil__img"/>
            </RouterLink>
            <div class="post-comment-insertgrey">
                <RouterLink to="/profil" class="post-comment__name">Aurélien Dehaine</RouterLink>
                <p class="post-comment__text">Magnifique témoignage ; si illustrant, si vrai... si courageux et fort.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import axios from "axios";

export default {
    name: 'Publication',
        data() {
        return {
            publicationPic: true,
            modification : false,
            modifyPostContent: "",
            inputFile: {},
            avatar: "",
            firstname: "",
            lastname: "",
            job: "",
            datePost: "",
            imageUrl: "",
            contentPost: "",
            likes: "",
            messages: [],
        }
    },
    methods: {
        handleFileUpload(e){
            this.inputFile = {
                name: e.target.files[0].name,
                data: e.target.files[0]
            };
        },
        addPublicationPic(){
            document.querySelector('.create-post-middle-input').click();
        },
        modifyPublication() {
            if (!this.modification) {
                this.modification = true;
            } else {
                this.modification = false;
            }
        }
    },
    mounted() {
        axios.get("http://localhost:3000/api/auth/posts", { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                this.messages = response.data;
                })
            .catch(error => alert("Erreur : " + error));
    }
}
</script>

<style scoped>
.create-post{
    inset: 0px;
    background-color: #4e516660;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index:1000;
    display: flex;
    justify-content: center;
    align-items: center;    
}
.create-post-window{
    background-color: white;
    border-radius: 20px;
}
.create-post-top{
    display: flex;
    align-items: center;
}
.create-post-top__title{
    width: 93%;
    text-align: center;
    font-weight: bold;
}
.create-post-top__close{
    height: 25px;
    cursor: pointer;
}
.create-post-line{
    display: block;
    background-color: #d1d2d6;
    height:1.5px;
    width: 100%;
}
.create-post-bottom{
    display: flex;
    justify-content: center;
}
.create-post-middle{
    padding:30px 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 480px;
}
.create-post-middle__text{
    min-width: 480px;
    min-height:42px;
    max-height:500px;
    border-radius: 8px;
    border: 0.5px solid #4E5166;
}
.create-post-middle-btn{
    color: black;
    height: 40px;
    width:calc(50% - 15px);
    margin-top: 30px;
    border-radius: 8px;
    border: 0.5px solid #4E5166;
    background-color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
}
input[type='file']{
    position: absolute;
    margin-top: 3px;
    margin-left: 3px;
    height: 1px;
    width: 1px;
    z-index: -5;
}
.create-post-middle-btn:hover{
    background-color: #4E5166;
    color: white;
    transition: 0.2s linear;
}.create-post-middle-btn__title{
    font-size: 0.8rem;
}
.create-post-bottom-btn{
    cursor: pointer;
    padding: 10px 45px;
    font-weight: bold;
    color: white;
    background-color: #FD2D01;
    border-radius: 5px;
    border: none;
    margin: 13px;
}
.create-post-middle-btn__icon{
    width: 15%;
}
.create-post-bottom-btn:hover{
    box-shadow: 1px 1px 10px #FD2D01;
    transition: 0.2s linear;
}
.nothing{
    max-width: 570px;
    margin: 45px auto;
    text-align: center;
    font-weight: bolder;
}
.post{
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 570px;
    margin: 25px auto;
    border-radius: 30px;
    border: 0.5px solid #4E5166;
    padding:25px;
}
.post-top{
    display: flex;
    align-items: center; 
}
.post-photoprofil{
    display: block;
    border-radius: 100px;
    width: 60px;
    height: 60px;
    overflow: hidden;
}
.post-photoprofil__img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.post-informations{
    margin-left: 25px;
}
.post-informations > p {
    margin:0;
    font-size: 0.8rem;
}
.post-name{
    text-decoration: none;
    color:#4E5166;
    margin:0;
    font-size: 0.8rem;
    font-weight: bold;
}
.post-date{
    font-weight: lighter;
}
.post-modsup{
    text-align: right;
    position: absolute;
    right:25px;
}
.post-modsup > p{
    cursor: pointer;
    margin:0;
    font-size: 0.8rem;
    font-weight: lighter;
}
.post-modsup > p:hover{
    font-weight: bolder;
    color: #FD2D01;
}
.post-middle-content-pict{
    margin:25px -25px;
    overflow: hidden;
}
.post-middle-content-pict__img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.post-middle-like-comment{
    display: flex;
    justify-content: space-between;
}
.post-middle-like, .post-middle-comment{
    cursor: pointer;
    display: flex;
    align-items: center; 
    margin-bottom: 25px;
}
.post-middle-like > p, .post-middle-comment > p{
    margin:0 10px;
}
.post-middle-like__icon, .post-middle-like__icon{
    font-size: 1.5rem;
}
.post-middle-like__icon:hover, .post-middle-like__icon:hover{
    color:#FD2D01;
}
.post-bottom__input{
    min-width: 560px;
    max-width: 90%;
    min-height:42px;
    max-height:500px;
    text-align: left;
    padding:10px 0 10px 10px;
    border-radius: 30px;
    border: 0.5px solid #4E5166;
    text-decoration: none;
    color: #4E5166;
    width: 100%;
}
.post-comment{
    margin-top: 25px;
    display:flex;
    justify-content: space-between;
}
.post-comment-insertgrey{
    border-radius: 3px 10px 10px 10px;
    width: 82%;
    padding: 10px;
    background-color: #d1d2d6;
}
.post-comment__name{
    text-decoration: none;
    color:#4E5166;
    margin:0;
    font-size: 0.8rem;
    font-weight: bold;
}
.post-comment__text{
    font-size: 0.8rem;
}
.comment-supp{
    text-align: right;
    position: absolute;
    right:35px;
}
.comment-supp > p{
    cursor: pointer;
    margin:0;
    font-size: 0.8rem;
    font-weight: lighter;
}
.comment-supp > p:hover{
    font-weight: bolder;
    color: #FD2D01;
}
</style>
