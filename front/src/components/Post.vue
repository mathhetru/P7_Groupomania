<template>
    <div class="post">
        <div class="post-top">
            <div class="post-photoprofil">
                <img :src="post.user.avatar" alt="photo-profil" class="post-photoprofil__img"/>
            </div>
            <div class="post-informations">
                <div class="post-name">{{ post.user.firstname }} {{ post.user.lastname }}</div>
                <p class="post-titre-poste">{{ post.user.job }}</p>
                <p class="post-date">{{ dateTime(post.post.date) }}</p>
            </div>
        </div>
        <div v-if="userCanModifyOrDeletePost" class="post-modsup">
            <p @click="modifyPublication(post.post.content, post.post.imageUrl)" class="post-modifier">Modifier</p>
            <p @click="deletePost" class="post-supprimer">Supprimer</p>
        </div>
        <div class="post-middle">
            <div class="post-middle-content">
                <p class="post-middle__text">{{ post.post.content }}</p>
                <div v-if="post.post.imageUrl" class="post-middle-content-pict">
                    <img :src="post.post.imageUrl" alt="photo-publication" class="post-middle-content-pict__img"/>
                </div>
            </div>
        </div>
        <div class="post-middle-like-comment">
            <div @click="addLike()" class="post-middle-like">
                <fontAwesome v-if="post.post.usersLiked.includes(this.userId)" icon="thumbs-up" class="post-middle-like__iconRED"/>
                <fontAwesome v-else icon="thumbs-up" class="post-middle-like__icon"/>
                <p>{{ post.post.likes }}</p>
            </div>
            <div class="post-middle-comment">
                <p>{{ post.post.commentNumber }}</p>
                <fontAwesome @click="focusCommentInput" icon="message" class="post-middle-like__icon"/>
            </div>
        </div>
        <form @submit.prevent="addComment" class="post-bottom-comment">
            <textarea ref="commentInput" rows="1" name="commentaire" id="commentaire" class="post-bottom__input" v-model="comment" placeholder="Ajouter un commentaire" aria-label="Ajouter votre commentaire"></textarea>
            <button type="submit" name="sendComment" id="sendComment" class="post-bottom__btn_wi">
                <fontAwesome icon="paper-plane"/>
            </button>
            <button type="submit" name="sendComment" id="sendComment" class="post-bottom__btn">Envoyer</button>
        </form>
        <div v-show="post.post.commentNumber != 0" v-for="comment in post.comments" class="post-comment">
            <div class="post-photoprofil">
                <img :src="comment.user.avatar" alt="photo-profil" class="post-photoprofil__img"/>
            </div>
            <div class="post-comment-insertgrey">
                <div v-if="this.userRole == 'administrateur' || comment.comment.commentUser == this.userId" class="comment-supp">
                    <p @click="deleteComment(comment.comment.commentId)"  class="comment-supprimer">Supprimer</p>
                </div>
                <div class="post-comment__name">{{ comment.user.firstname }} {{ comment.user.lastname }}</div>
                <p class="post-comment__text">{{  comment.comment.commentContent}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import router from "../router";

export default {
    name: 'Post',
    props: {
        post: {
            type: Object,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        userRole: {
            type: String,
            required: true,
        }
    },
    computed: {
        userCanModifyOrDeletePost() {
            return this.userRole == 'administrateur' || this.post.post.userId == this.userId
        }
    },
    data() {
        return {
            comment: null
        };
    },
    methods: {
        dateTime(dateValue) {
            var date = moment(dateValue);
            date.locale('fr');
            return date.format("LLL");
        },
        handleFileModifyUpload(e){
            this.inputFile = {
                name: e.target.files[0].name,
                data: e.target.files[0]
            };
        },
        delModifyPublicationPic() {
            this.inputFile.name = null;
            this.inputFileName = this.inputFile.name;
        },
        modifyPublication(contentToModify, imageToModify) {
            this.modification = !this.modification;
            this.modifyPostContent = contentToModify;
            this.getImageUrl = imageToModify;
        },
        deletePost(){
            this.$emit('delete-post', this.post.post._id);
        },
        addLike(){
            this.$emit('like-post', this.post.post._id);
        },
        focusCommentInput(){
            this.$refs.commentInput.focus()
        },
        addComment(){
            if (!this.comment) {
                return alert("Vous ne pouvez pas envoyer de commentaire vide, veuillez remplir le champ.")
            }
            this.$emit('comment-post', { postId: this.post.post._id, comment: this.comment });
        },
        deleteComment(idComment){
            axios.delete("http://localhost:3000/api/auth/posts/" + this.post._id + "/comments/" + idComment, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
                .then(() => {
                    router.go();
                    })
                .catch(error => alert("Erreur : " + error));
        },
    }
}
</script>

<style scoped>
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
}
</style>