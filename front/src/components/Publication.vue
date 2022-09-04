<template>
    <div class="modify-post" v-show="modification">
        <div class="modify-post-window">
            <div class="modify-post-top">
                <p class="modify-post-top__title">Modifier votre publication</p>
                <fontAwesome icon="close" @click="modifyPublication" class="modify-post-top__close"/>
            </div>
            <span class="modify-post-line"></span>
            <form @submit="updatePublication">
                <div class="modify-post-middle" aria-label="Fenetre créer une publication">
                    <textarea v-model="modifyPostContent" placeholder="Votre publication..." name="content-text" rows="2" class="modify-post-middle__text" aria-label="Ecrire son texte ici"></textarea>
                    <div @click="modifyPublicationPic" class="modify-post-middle-btn">
                        <input type="file" aria-label="bouton ajouter une image" class="modify-post-middle-input" @change="handleFileModifyUpload">
                        <fontAwesome icon="camera" class="modify-post-middle-btn__icon"/>
                        <p class="modify-post-middle-btn__title">Modifier l'image</p>
                    </div>
                    <div aria-label="bouton ajouter une vidéo youtube" class="modify-post-middle-btn">
                        <fontAwesome icon="circle-play" class="modify-post-middle-btn__icon"/>
                        <p class="modify-post-middle-btn__title">Modifier la vidéo via Youtube</p>
                    </div>
                    <div v-if="this.inputFile.name != null" class="modify-post-middle-file">
                        <fontAwesome @click="delModifyPublicationPic" icon="circle-xmark" class="modify-post-middle-btn-file__icon"/>
                        <p class="modify-post-middle-file__text">{{ this.inputFile.name }}</p>
                    </div>
                </div>
                <span class="modify-post-line"></span>
                <div class="modify-post-bottom">
                    <button type="submit" name="publication" id="publication" class="modify-post-bottom-btn">Publier</button>
                </div>
            </form>
        </div>
    </div>
    <div v-if="messages.length == 0" class="nothing">Il n'y a pas de publications pour l'instant !</div>
    <div v-else v-for="message in messages" :key="message.id" class="post">
        <div class="post-top">
            <div class="post-photoprofil">
                <img :src="message.user.avatar" alt="photo-profil" class="post-photoprofil__img"/>
            </div>
            <div class="post-informations">
                <div class="post-name">{{ message.user.firstname }} {{ message.user.lastname }}</div>
                <p class="post-titre-poste">{{ message.user.job }}</p>
                <p class="post-date">{{ dateTime(message.post.date) }}</p>
            </div>
        </div>
        <div v-if="this.userRole == 'administrateur' || message.post.userId == this.userId" class="post-modsup">
            <p @click="modifyPublication(message.post._id, message.post.content, message.post.imageUrl)" class="post-modifier">Modifier</p>
            <p @click="delPublication(message.post._id)" class="post-supprimer">Supprimer</p>
        </div>
        <div class="post-middle">
            <div class="post-middle-content">
                <p class="post-middle__text">{{ message.post.content }}</p>
                <div v-if="message.post.imageUrl" class="post-middle-content-pict">
                    <img :src="message.post.imageUrl" alt="photo-publication" class="post-middle-content-pict__img"/>
                </div>
            </div>
        </div>
        <div class="post-middle-like-comment">
            <div @click="addLike(message.post._id)" class="post-middle-like">
                <fontAwesome v-if="message.post.usersLiked.includes(this.userId)" icon="thumbs-up" class="post-middle-like__iconRED"/>
                <fontAwesome v-else icon="thumbs-up" class="post-middle-like__icon"/>
                <p>{{ message.post.likes }}</p>
            </div>
            <div class="post-middle-comment">
                <p>{{ message.post.commentNumber }}</p>
                <fontAwesome @click="addCommentClick" icon="message" class="post-middle-like__icon"/>
            </div>
        </div>
        <form @submit="addComment($event, message.post._id)" class="post-bottom-comment">
            <textarea rows="1" name="commentaire" id="commentaire" class="post-bottom__input" placeholder="Ajouter un commentaire" aria-label="Ajouter votre commentaire"></textarea>
            <button type="submit" name="sendComment" id="sendComment" class="post-bottom__btn_wi">
                <fontAwesome icon="paper-plane"/>
            </button>
            <button type="submit" name="sendComment" id="sendComment" class="post-bottom__btn">Envoyer</button>
        </form>
        <div v-show="message.post.commentNumber != 0" v-for="comment in message.comments" class="post-comment">
            <div class="post-photoprofil">
                <img :src="comment.user.avatar" alt="photo-profil" class="post-photoprofil__img"/>
            </div>
            <div class="post-comment-insertgrey">
                <div v-if="this.userRole == 'administrateur' || comment.comment.commentUser == this.userId" class="comment-supp">
                    <p @click="delComment(message.post._id, comment.comment.commentId)"  class="comment-supprimer">Supprimer</p>
                </div>
                <div class="post-comment__name">{{ comment.user.firstname }} {{ comment.user.lastname }}</div>
                <p class="post-comment__text">{{  comment.comment.commentContent}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import router from "../router";
import axios from "axios";
import moment from "moment";

export default {
    name: 'Publication',
        data() {
        return {
            modifyOrDel: "",
            publicationPic: true,
            modification : false,
            modifyPostContent: "",
            inputFile: {},
            messages: [],
            getImageUrl: "",
            userId: "",
            userRole: "",
            getIdPost: ""        }
    },
    methods: {
        handleFileModifyUpload(e){
            this.inputFile = {
                name: e.target.files[0].name,
                data: e.target.files[0]
            };
        },
        modifyPublicationPic(){
            document.querySelector('.modify-post-middle-input').click();
        },
        delModifyPublicationPic() {
            this.inputFile.name = null;
            this.inputFileName = this.inputFile.name;
        },
        modifyPublication(idPostToModify, contentToModify, imageToModify) {
            if (!this.modification) {
                this.modification = true;
            } else {
                this.modification = false;
            }
            this.getIdPost = idPostToModify;
            this.modifyPostContent = contentToModify;
            this.getImageUrl = imageToModify;
        },
        delPublication(idPostDel){
            axios.delete("http://localhost:3000/api/auth/posts/" + idPostDel, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
                .then(() => {
                    router.go();
                    })
                .catch(error => alert("Erreur : " + error));
        },
        dateTime(dateValue) {
            var date = moment(dateValue);
            date.locale('fr');
            return date.format("LLL");
        },
        updatePublication(e){
            e.preventDefault();
            let post = {
                content: this.modifyPostContent,
            };
            let formData = new FormData();
            formData.append('post', JSON.stringify(post));
            if (this.inputFile.name != null){ 
                formData.append('imageUrl', this.inputFile.data, this.inputFile.name);
            }
            axios.put("http://localhost:3000/api/auth/posts/" + this.getIdPost, formData, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
                .then((response) => {
                    this.getImageUrl = response.data.imageUrl;
                    this.content = this.modifyPostContent;
                    this.modification = false;
                    router.go();
                    })
                .catch(error => alert("Erreur : " + error));
        },
        addLike(idPost){
            axios.put("http://localhost:3000/api/auth/posts/likes/" + idPost, {}, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
                .then((response) => {
                    router.go();
                    })
                .catch(error => alert(error));
        },
        addCommentClick(e){
            e.target.closest('.post').querySelector('.post-bottom__input').focus();
        },
        addComment(e, idPost){
            let form = e.target
            let textarea = form.querySelector('.post-bottom__input');
            if (textarea.value != "") {
                axios.put("http://localhost:3000/api/auth/posts/comments/" + idPost, {"comment" : textarea.value}, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
                    .then((response) => {
                        router.go();
                        })
                    .catch(error => alert(error));
            } else {
                e.preventDefault();
                alert("Vous ne pouvez pas envoyer de commentaire vide, veuillez remplir le champ.")
            }
        },
        delComment(idPostCommentDel, idComment){
            axios.delete("http://localhost:3000/api/auth/posts/" + idPostCommentDel + "/comments/" + idComment, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
                .then(() => {
                    router.go();
                    })
                .catch(error => alert("Erreur : " + error));
        },
    },
    mounted() {
        axios.get("http://localhost:3000/api/auth/posts", { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                var datas = response.data.reverse();
                var currentPath = this.$route.path;
                if (currentPath == "/profil") {
                    for (let i=0; i < datas.length; i++) {
                        var data = datas[i];
                        if (data.post.userId == localStorage.getItem("userId")) {
                            this.messages.push(data);
                        }
                    }
                } 
                else {
                    this.messages = datas;
                }
            })
            .catch(error => alert("Erreur : " + error));
        axios.get("http://localhost:3000/api/auth/user/" + localStorage.getItem("userId"), { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                this.userRole = response.data.role;
                this.userId = localStorage.getItem("userId");
                })
            .catch(error => alert("Erreur : " + error));
    }
}
</script>

<style scoped>
/* FENETRE MODIFIER POST */
.modify-post{
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
.modify-post-window{
    background-color: white;
    border-radius: 20px;
}
.modify-post-top{
    display: flex;
    align-items: center;
}
.modify-post-top__title{
    width: 93%;
    text-align: center;
    font-weight: bold;
}
.modify-post-top__close{
    height: 25px;
    cursor: pointer;
}
.modify-post-line{
    display: block;
    background-color: #d1d2d6;
    height:1.5px;
    width: 100%;
}
.modify-post-bottom{
    display: flex;
    justify-content: center;
}
.modify-post-middle{
    padding:30px 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 480px;
}
.modify-post-middle__text{
    min-width: 480px;
    min-height:42px;
    max-height:500px;
    border-radius: 8px;
    border: 0.5px solid #4E5166;
}
.modify-post-middle-btn{
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
.modify-post-middle-btn:hover{
    background-color: #4E5166;
    color: white;
    transition: 0.2s linear;
}.modify-post-middle-btn__title{
    font-size: 0.8rem;
}
.modify-post-bottom-btn{
    cursor: pointer;
    padding: 10px 45px;
    font-weight: bold;
    color: white;
    background-color: #FD2D01;
    border-radius: 5px;
    border: none;
    margin: 13px;
}
.modify-post-middle-btn__icon{
    width: 15%;
}
.modify-post-bottom-btn:hover{
    box-shadow: 1px 1px 10px #FD2D01;
    transition: 0.2s linear;
}
.modify-post-middle-file{
    display: flex;
    align-items: center;
    color: black;
}
.modify-post-middle-btn-file__icon{
    cursor: pointer;
    margin-left: 10px;
    font-size: 0.rem;
}
.modify-post-middle-btn-file__icon:hover{
    color:#FD2D01;
}
.modify-post-middle-file__text{
    margin: 5px 10px;
    font-size: 0.8rem;
}
.nothing{
    max-width: 570px;
    margin: 45px auto;
    text-align: center;
    font-weight: bolder;
}

/* TOP OF PUBLICATION */
.post{
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 570px;
    margin: 15px auto;
    border-radius: 30px;
    border: 0.5px solid #4E5166;
    padding:25px;
    box-shadow: 2px 3px 8px #d0d1d6;
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

/* PUBLICATION CONTENT */
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
.post-middle-like__icon{
    font-size: 1.5rem;
}
.post-middle-like__iconRED{
    font-size: 1.5rem;
    color:#FD2D01;
}
.post-middle-like__icon:hover{
    color:#FD2D01;
}

/* BTN LIKE ET COMMENT */
.post-bottom-comment{
    display: flex;
    justify-content: space-between;
}
.post-bottom__input{
    min-height:22px;
    max-height:500px;
    text-align: left;
    padding:10px 0 10px 10px;
    border-radius: 30px;
    border: 0.5px solid #4E5166;
    text-decoration: none;
    color: #4E5166;
    min-width: 78%;
}
.post-bottom__btn{
    height: 40px;
    cursor: pointer;
    padding: 10px 25px;
    font-weight: bold;
    color: white;
    background-color: #FD2D01;
    border-radius: 20px;
    border: none;
}
.post-bottom__btn:hover{
    background-color: #4E5166;
    color: white;
    transition: 0.2s linear;
}
.post-bottom__btn_wi{
    display: none;
    height: 40px;
    cursor: pointer;
    padding: 10px 25px;
    font-weight: bold;
    color: white;
    background-color: #FD2D01;
    border-radius: 20px;
    border: none;
}
.post-bottom__btn_wi:hover{
    background-color: #4E5166;
    color: white;
    transition: 0.2s linear;
}

/* COMMENTAIRE */
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

/* MOBILE */ 
@media screen and (max-width: 425px) {
    /* TOP OF PUBLICATION */ 
    .post{
        width: 78vw;
    }
    .post-modsup{
        display: flex;
        justify-content: flex-end;
        right: 20px;
        top: 15px;
    }
    .post-modsup > p{
        font-size: 0.6rem;
        margin-left: 10px;
    }
    

    /* PUBLICATION CONTENT */
    .post-middle__text{
        font-size: 0.9rem;
    }

    /* BTN LIKE ET COMMENT */
    .post-bottom__input{
        min-width: 78%;
    }
    .post-bottom__btn{
        display: none;
    }
    .post-bottom__btn_wi{
        display: block;
        padding: 10px 12px;
    }

    /* COMMENTAIRE */
    .post-comment{
        margin-top: 15px;
    }
    .post-photoprofil {
        width: 50px;
        height: 50px;
    }
    .post-comment-insertgrey{
        width: 72%;
        padding: 8px;
    }
    .comment-supp > p {
        font-size: 0.6rem;
    }

    /* MODAL MODIFICATION */
    .modify-post-middle{
        flex-direction: column;
        align-items: center;
        width: 70vw;
        padding: 30px;
    }
    .modify-post-middle-btn{
        width: 70vw;
        margin-top:15px;
    }
    .modify-post-middle__text{
        min-width: calc(100% - 6px);
        max-width: calc(100% - 6px);
        min-height: 42px;
        max-height: 500px;
    }
    .modify-post-top__close{
        padding-right: 15px;    
    }
}
</style>
