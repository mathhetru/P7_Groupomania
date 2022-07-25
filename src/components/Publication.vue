<template>
    <div class="post">
        <div class="post-top">
            <RouterLink to="/profil" class="post-photoprofil">
                <img src="../assets/photoprofil.jpg" alt="photo-profil" class="post-photoprofil__img"/>
            </RouterLink>
            <div class="post-informations">
                <p class="post-nom-prenom">Aurélien Dehaine</p>
                <p class="post-titre-poste">Chargée de mission Stratégie</p>
                <p class="post-date">jeudi 7 juillet à 11h45</p>
            </div>
            <div class="post-modsup">
                <p class="post-modifier">Modifier</p>
                <p class="post-supprimer">Supprimer</p>
            </div>
        </div>
        <div class="post-middle">
            <div class="post-middle-content">
                <p class="post-middle-text">Bonjour, Je ne trouve pas le site du CE pour acheter mes tickets de cinéma ? Merci</p>
                <img src="../assets/photoprofil.jpg" alt="photo-profil" class="post-middle__img"/>
            </div>
        </div>
        <span class="post-line"></span>
        <div class="post-bottom-editor-comment">
            <input type="text" name="commentaire" id="commentaire" class="post-bottom__input" placeholder="Ajouter un commentaire" aria-label="Ajouter votre commentaire">
        </div>
        <span class="post-line"></span>
        <div class="post-like-comment">
            <RouterLink to="/profil" class="post-photoprofil">
                <img src="../assets/photoprofil.jpg" alt="photo-profil" class="post-photoprofil__img"/>
            </RouterLink>
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
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    max-width: 570px;
    margin: auto;
    margin-top:25px;
    border-radius: 30px;
    border: 0.5px solid #4E5166;
    padding:25px;
}
.post-photoprofil{
    border-radius: 100px;
    height:60px;
    overflow: hidden;
}
.post-photoprofil__img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>
