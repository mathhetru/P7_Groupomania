<template>
    <div class="modify" v-show="modification">
        <div class="modify-window">
            <div class="modify-top">
                <p class="modify-top__title">Modifier votre profil</p>
                <fontAwesome icon="close" @click="showModifyWindow" class="modify-top__close"/>
            </div>
            <span class="modify-line"></span>
            <form @submit="updateProfil">
                <div class="modify-middle" aria-label="Fenetre créer une publication">
                    <div>
                        <span v-show="errorFirstNameUpdate" class="modify-middle__errormsg">Champ invalide, veuillez vérifier votre prénom.</span>
                        <input type="text" v-model="firstNameUpdate" placeholder="Votre prénom" class="modify-middle__input"/>
                    </div>
                    <div>   
                        <span v-show="errorLastNameUpdate" class="modify-middle__errormsg">Champ invalide, veuillez vérifier votre nom.</span>
                        <input type="text" v-model="lastNameUpdate" placeholder="Votre nom" class="modify-middle__input"/>
                    </div>
                    <div>
                        <span v-show="errorJobUpdate" class="modify-middle__errormsg">Champ invalide, veuillez vérifier votre poste.</span>
                        <input type="text" v-model="jobUpdate" placeholder="Votre rôle dans l'entreprise" class="modify-middle__input"/>
                    </div>
                    <div @click="modifyPicProfil" class="modify-middle-btn">
                        <input type="file" aria-label="bouton ajouter une image" class="modify-middle-input" @change="handleFileUpload">
                        <fontAwesome icon="camera" class="modify-middle-btn__icon"/>
                        <p class="modify-middle-btn__title">Votre photo de profil</p>
                    </div>
                </div>
                <span class="modify-line"></span>
                <div class="modify-bottom">
                    <button type="submit" id="modifyProfil" class="modify-bottom-btn">Modifier</button>
                </div>
            </form>
        </div>
    </div>
    <div class="banniere-grey">
        <div class="about">
            <div class="about-photo-profil">
                <img :src="avatar" alt="photo-profil" class="about-photo-profil__img">
            </div>
            <div class="about-informations">
                <p class="about-info-name">{{ firstname }} {{ lastname }}</p>
                <p class="about-info-poste">{{ job }}</p>
            </div>
            <button @click="showModifyWindow" class="about-modify-btn">Modifier</button>
        </div>
        
    </div>
    <p class="about-yourpublications">Vos publications sur l'intranet</p>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
    name: 'Profil',
    data() {
        return {
            modification : false,
            firstname: "",
            lastname: "",
            job: "",
            avatar: "",
            firstNameUpdate: "",
            lastNameUpdate: "",
            jobUpdate: "", 
            errorFirstNameUpdate: false,
            errorLastNameUpdate: false,
            errorJobUpdate: false,
            inputFile: {}
        }
    },
    methods: {
        handleFileUpload(e){
            this.inputFile = {
                name: e.target.files[0].name,
                data: e.target.files[0]
            };
        },
        modifyPicProfil(){
            document.querySelector('.modify-middle-input').click();
        },
        showModifyWindow() {
            if (!this.modification) {
                this.modification = true;
            } else {
                this.modification = false;
            }
        },
        updateProfil(e){
            e.preventDefault();
            var nameRegExp = new RegExp("^[A-zÀ-ú \-]+$");
            this.errorFirstNameUpdate = !nameRegExp.test(this.firstNameUpdate);
            this.errorLastNameUpdate = !nameRegExp.test(this.lastNameUpdate);
            this.errorJobUpdate = !nameRegExp.test(this.jobUpdate);
            let user = {
                firstname: this.firstNameUpdate,
                lastname: this.lastNameUpdate,
                job: this.jobUpdate
            };
            
            let formData = new FormData();
            formData.append('user', JSON.stringify(user));
            if (this.inputFile.name != null){ 
                formData.append('avatar', this.inputFile.data, this.inputFile.name);
            }
            if (this.errorFirstNameUpdate || this.errorLastNameUpdate || this.errorJobUpdate) {
                return;
            }
            axios.put("http://localhost:3000/api/auth/user/" + localStorage.getItem("userId"), formData, { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
                .then((response) => {
                    this.avatar = response.data.avatar;
                    this.firstname = this.firstNameUpdate;
                    this.lastname = this.lastNameUpdate;
                    this.job = this.jobUpdate;
                    this.modification = false;
                    router.go();
                    })
                .catch(error => alert("Erreur : " + error));
        }
    },
    mounted() {
        axios.get("http://localhost:3000/api/auth/user/" + localStorage.getItem("userId"), { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")}})
            .then((response) => {
                this.firstname = response.data.firstname;
                this.lastname = response.data.lastname;
                this.job = response.data.job;
                this.avatar = response.data.avatar;
                this.firstNameUpdate = this.firstname;
                this.lastNameUpdate = this.lastname;
                this.jobUpdate = this.job;
                })
            .catch(error => alert("Erreur : " + error));
    }
}
</script>

<style scoped>

.modify{
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
.modify-window{
    background-color: white;
    border-radius: 20px;
}
.modify-top{
    display: flex;
    align-items: center;
}
.modify-top__title{
    width: 93%;
    text-align: center;
    font-weight: bold;
}
.modify-top__close{
    height: 25px;
    cursor: pointer;
}
.modify-line{
    display: block;
    background-color: #d1d2d6;
    height:1.5px;
    width: 100%;
}
.modify-bottom{
    display: flex;
    justify-content: center;
}
.modify-middle{
    padding:30px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 480px;
    height:220px;
}
.modify-middle__input{
    height: 40px;
    border-radius: 8px;
    border: 0.5px solid #4E5166;
    padding:0;
    font-size: 0.8rem;
    padding-left:15px;
    width: 463px
}
input[type='file']{
    position: absolute;
    margin-top: 3px;
    margin-left: 3px;
    height: 1px;
    width: 1px;
    z-index: -5;
}
.modify-middle-btn{
    color: black;
    height: 40px;
    border-radius: 8px;
    border: 0.5px solid #4E5166;
    background-color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding:0;
}
.modify-middle-btn__icon{
    width: 10%;
}
.modify-middle-btn__title{
    font-size: 0.8rem;
}
.modify-middle-btn:hover{
    background-color: #4E5166;
    color: white;
    transition: 0.2s linear;
}.modify-middle-btn__title{
    font-size: 0.8rem;
}
.modify-bottom-btn{
    cursor: pointer;
    padding: 10px 45px;
    font-weight: bold;
    color: white;
    background-color: #FD2D01;
    border-radius: 5px;
    border: none;
    margin: 13px;
}
.modify-middle__errormsg{
    display: block;
    font-size: 0.65rem;
    margin:0;
}

.modify-bottom-btn:hover{
    box-shadow: 1px 1px 10px #FD2D01;
    transition: 0.2s linear;
}
.banniere-grey{
    margin:auto;
    width:100%;
    background-color: #d1d2d6;
}
.about{
    position: relative;
    max-width: 1024px;
    padding: 25px 0;
    margin: auto;
    display: flex;
    align-items: flex-end;
}
.about-modify-btn{
    position: absolute;
    right:15px;
}
.about-yourpublications{
    max-width: 620px;
    margin:auto;
    margin-top:15px;
}
.about-photo-profil{
    border-radius: 50%;
    height:250px;
    width:250px;
    overflow: hidden;
}
.about-photo-profil__img{
    height: 101%;
    width: 101%;
    object-fit: cover;
}
.about-informations{
    margin-left:25px;
}
.about-info-name{
    font-size:2rem;
    font-weight: bolder;
    color: #FD2D01;
    margin:0;
}
.about-info-poste{
    font-size:1.5rem;
    font-weight:lighter;
    margin:0;
    margin-bottom:25px;
}
.about-modify-btn{
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-decoration: none;
    color: #FD2D01;
    font-weight: bold;
    width: 110px;
    height: 39px;
    border-radius: 30px;
    border: 2px solid #FD2D01;
}
.about-modify-btn:hover{
    color: white;
    background-color: #FD2D01;
    transition: 0.2s linear;
}
</style>