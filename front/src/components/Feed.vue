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
                    <label for="modify-post-middle-input" class="modify-post-middle-btn">
                        <input type="file" id="modify-post-middle-input" aria-label="bouton ajouter une image" class="modify-post-middle-input" @change="handleFileModifyUpload">
                        <fontAwesome icon="camera" class="modify-post-middle-btn__icon"/>
                        <p class="modify-post-middle-btn__title">Modifier l'image</p>
                    </label>
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
    <NoPost v-if="posts.length === 0" />
    <section v-else class="posts">
        <Post
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :user-id="userId"
            :user-role="userRole"
            @delete-post="deletePost"
            @like-post="likePost"
            @comment-post="commentPost"
        />
    </section>
</template>

<script>
import { RouterLink } from "vue-router";
import router from "../router";
import axios from "axios";
import moment from "moment";
import NoPost from "./NoPost.vue";
import Post from './Post.vue'
import { PostsService } from "../services/PostsService";

export default {
    name: 'Feed',
    components: {
        NoPost,
        Post
    },
        data() {
        return {
            modifyOrDel: "",
            publicationPic: true,
            modification : false,
            modifyPostContent: "",
            inputFile: {},
            posts: [],
            getImageUrl: "",
            userId: "",
            userRole: "",
            getIdPost: ""   
        }
    },
    methods: {
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
        modifyPublication(idPostToModify, contentToModify, imageToModify) {
            this.modification = !this.modification;
            this.getIdPost = idPostToModify;
            this.modifyPostContent = contentToModify;
            this.getImageUrl = imageToModify;
        },
        deletePost(postId){
            PostsService().deletePost(postId)
                .then(() => {
                    this.posts = this.posts.filter((post) => post.post._id !== postId)
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
        likePost(postId){
            PostsService().likePost(postId)
                .then(() => {
                    const postToLike = this.findPost(postId)
                    if (!postToLike.post.usersLiked.includes(this.userId)) {
                        postToLike.post.likes += 1;
                        postToLike.post.usersLiked.push(this.userId);
                    }
                })
                .catch(error => alert(error));
        },
        findPost(postId) {
            return this.posts.find(post => post.post._id === postId)
        },
        commentPost({ postId, comment }){
            PostsService().commentPost(postId, comment)
                    .then(() => {
                        const postToComment = this.findPost(postId);
                        comment = postToComment.commentContent;
                        if (postToComment.commentUser == this.userId) {
                            
                            console.log("otot")
                        }

                        // postToComment.comments = [comment, ...postToComment.comments];
                    })
                    .catch(error => alert(error));
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
                            this.posts.push(data);
                        }
                    }
                } 
                else {
                    this.posts = datas;
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

/* MOBILE */ 
@media screen and (max-width: 425px) {
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
