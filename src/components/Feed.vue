<template>
    <CreatePost v-show="publication"/>
    <div class="main-create-post">
        <RouterLink to="/profil" class="main-create-post-photoprofil">
            <img src="../assets/photoprofil.jpg" alt="photo-profil" class="main-create-post-photoprofil__img"/>
        </RouterLink>
        <button class="main-create-post-btn" @click="createPublication">
            <p class="main-create-post-btn__title">Créer une publication...</p>
        </button>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import CreatePost from "./CreatePost.vue";

export default {
    name: "Publication",
    components: { CreatePost },
    data() {
        return {
            publication : false,
        }
    },
    methods: {
        createPublication() {
            if (!this.publication) {
                this.publication = true;
            } else {
                this.publication = false;
            }
        },
    }
}
</script>

<style scoped>
.main-create-post{
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 570px;
    margin: auto;
    border-radius: 30px;
    border: 0.5px solid #4E5166;
    padding:25px;
}
.main-create-post-photoprofil{
    border-radius: 100px;
    height:60px;
    overflow: hidden;
}
.main-create-post-photoprofil__img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.main-create-post-btn{
    text-align: left;
    cursor: pointer;
    border-radius: 30px;
    border: 0.5px solid #4E5166;
    text-decoration: none;
    color: #4E5166;
    width: 85%;
}
.main-create-post-btn:hover{
    background-color: #4E5166;
    color: white;
    transition: 0.2s linear;
}
.main-create-post-btn__title{
    margin-left: 20px;
}
</style>