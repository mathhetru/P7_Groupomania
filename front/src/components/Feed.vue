<template>
    <div class="create-post" v-show="publication">
        <div class="create-post-window">
            <div class="create-post-top">
                <p class="create-post-top__title">Créer une publication</p>
                <fontAwesome icon="close" @click="createPublication" class="create-post-top__close"/>
            </div>
            <span class="create-post-line"></span>
            <form @submit="createPost">
                <div class="create-post-middle" aria-label="Fenetre créer une publication">
                    <textarea v-model="contentPost" placeholder="Votre publication..." name="content-text" rows="2" class="create-post-middle__text" aria-label="Ecrire son texte ici"></textarea>
                    <div @click="addPublicationPic" class="create-post-middle-btn">
                        <input type="file" aria-label="bouton ajouter une image" class="create-post-middle-input" @change="handleFileUpload">
                        <fontAwesome icon="camera" class="create-post-middle-btn__icon"/>
                        <p class="create-post-middle-btn__title">Ajouter une image</p>
                    </div>
                    <div aria-label="bouton ajouter une vidéo youtube" class="create-post-middle-btn">
                        <fontAwesome icon="circle-play" class="create-post-middle-btn__icon"/>
                        <p class="create-post-middle-btn__title">Ajouter une vidéo via Youtube</p>
                    </div>
                    <div v-if="this.inputFile.name != null" class="create-post-middle-file">
                        <fontAwesome @click="delPublicationPic" icon="circle-xmark" class="create-post-middle-btn-file__icon"/>
                        <p class="create-post-middle-file__text">{{ this.inputFile.name }}</p>
                    </div>
                </div>
                <span class="create-post-line"></span>
                <div class="create-post-bottom">
                    <button type="submit" name="publication" id="publication" class="create-post-bottom-btn">Publier</button>
                </div>
            </form>
        </div>
    </div>
    <div class="main-create-post">
        <RouterLink to="/profil" class="main-create-post-photoprofil">
            <img :src="avatar" alt="photo-profil" class="main-create-post-photoprofil__img"/>
        </RouterLink>
        <button class="main-create-post-btn" @click="createPublication">
            <p class="main-create-post-btn__title">Créer une publication...</p>
        </button>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import axios from "axios";
import router from "../router";

export default {
    name: "Feed",
    data() {
        return {
            publication : false,
            avatar: "",
            userRole: "",
            contentPost: "",
            inputFile: {},
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
        delPublicationPic() {
            this.inputFile.name = null;
            this.inputFileName = this.inputFile.name;
        },
        createPublication(e) {
            if (!this.publication) {
                this.publication = true;
            } else {
                this.publication = false;
            }
        },
        createPost(e){
            e.preventDefault();
            let post = {
                userId: localStorage.getItem("userId"),
                date: Date.now(),
                content: this.contentPost
            };
            
            let formData = new FormData();
            formData.append('post', JSON.stringify(post));
            if (this.inputFile.name != null){ 
                formData.append('imageUrl', this.inputFile.data, this.inputFile.name);
            }
            axios.post("http://localhost:3000/api/auth/posts", formData, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
                .then((response) => {
                    router.go();
                    })
                .catch(error => alert(error + "Erreur : veuillez ajouter du texte en plus de l'image"));
        }
    },
    mounted() {
        axios.get("http://localhost:3000/api/auth/user/" + localStorage.getItem("userId"), { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                this.avatar = response.data.avatar;
                this.userRole = response.data.role;
                })
            .catch(error => alert("Erreur : " + error));
    }
}
</script>

<style scoped>

/* FENETRE CREER UNE PUBLICATION */
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
.create-post-middle-btn__icon{
    width: 15%;
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
.create-post-middle-file{
    display: flex;
    align-items: center;
    color: black;
}
.create-post-middle-btn-file__icon{
    cursor: pointer;
    margin-left: 10px;
    font-size: 0.rem;
}
.create-post-middle-btn-file__icon:hover{
    color:#FD2D01;
}
.create-post-middle-file__text{
    margin: 5px 10px;
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
.create-post-bottom-btn:hover{
    box-shadow: 1px 1px 10px #FD2D01;
    transition: 0.2s linear;
}

/* BTN CREER UNE PUBLICATION */
.main-create-post{
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 570px;
    margin: auto;
    border-radius: 30px;
    border: 0.5px solid #4E5166;
    padding:25px;
    box-shadow: 2px 3px 8px #d0d1d6;
}
.main-create-post-photoprofil{
    border-radius: 100px;
    height:60px;
    width: 60px;
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

/* MOBILE */
@media screen and (max-width: 610px) {
    .create-post-middle__text{
        min-width: calc(100% - 6px);
        max-width: calc(100% - 6px);
        min-height:42px;
        max-height:500px;
    }
    .create-post-top__close{
        padding-right: 15px; 
    }
    .create-post-middle{
        padding: 30px;
        width: 70vw;
        flex-direction: column;
    }
    .create-post-middle-btn{
        width: 100%;
        margin-top:15px;
    }

    /* BTN CREER UNE PUBLICATION */
    .main-create-post{
        width: 78vw;
    }
    .main-create-post-btn{
        width: 72%;
    }
}
</style>