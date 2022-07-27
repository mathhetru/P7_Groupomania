<template>
    <div class="post">
        <div class="post-top">
            <RouterLink to="/profil" class="post-photoprofil">
                <img src="../assets/photoprofil.jpg" alt="photo-profil" class="post-photoprofil__img"/>
            </RouterLink>
            <div class="post-informations">
                <RouterLink to="/profil" class="post-name">Aurélien Dehaine</RouterLink>
                <p class="post-titre-poste">Chargée de mission Stratégie</p>
                <p class="post-date">jeudi 7 juillet à 11h45</p>
            </div>
        </div>
        <div class="post-modsup">
            <p class="post-modifier">Modifier</p>
            <p class="post-supprimer">Supprimer</p>
        </div>
        <div class="post-middle">
            <div class="post-middle-content">
                <p class="post-middle__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore voluptatibus fugit eaque illo nesciunt architecto odio ipsa numquam omnis magni! Ad sunt illo provident voluptatibus. Excepturi suscipit autem ab magnam?</p>
                <div class="post-middle-content-pict">
                    <img src="../assets/20220519_165618.jpg" alt="photo-publication" class="post-middle-content-pict__img"/>
                </div>
            </div>
        </div>
        <div class="post-middle-like-comment">
            <div class="post-middle-like">
                <fontAwesome icon="thumbs-up" class="post-middle-like__icon"/>
                <p class="post-middle-like__number">56</p>
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
export default {
    name: 'Publication',
}
</script>

<style scoped>
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
    max-width: 100%;
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
    border-radius: 10px;
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
</style>
