<template>
    <div class="login">
        <div class="login-insert">
            <p class="login-insert-msg">Bienvenue</p>
            <p class="login-insert-msg p-greythin">Sur votre réseau social</p>
            <p class="login-insert-msg p-red">Groupomania-intranet</p>
            <img src="../assets/img-accueil.svg" alt="Groupomania-image-accueil" class="login-insert-img"/>
        </div> 
        <div class="login-container">
            <form class="login-container-form" @submit="logUser">
                <p class="login-container__title">Groupomania</p>
                <input type="text" v-model="emailLogin" name="emailLogin" id="emailLogin" class="login-container__input" placeholder="Adresse e-mail" aria-label="Adresse email">
                <input type="password" v-model="passwordLogin" name="passwordLogin" id="passwordLogin" class="login-container__input" placeholder="Mot de passe" aria-label="Mot de passe">
                <button type="submit" class="login-container__btn">Se connecter</button>
            </form>
            <p id="connectErrorMsg" class="login-container__errormsg"><!-- Adresse mail ou mot de passe incorrect.--></p>
        </div>
    </div> 
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
    name: 'Login',
    data() {
        return {
            emailLogin: null,
            passwordLogin: null,
        }
    },
    methods: {
        logUser(e) {
            e.preventDefault();
            const emailLogin = this.emailLogin;
            const passwordLogin = this.passwordLogin;
            axios.post("http://localhost:3000/api/auth/login", { email: emailLogin, password: passwordLogin })
                .then(function (response) {
                    console.log('titi');
                    router.push("/feed");
                    })
                .catch(error => alert("Erreur : " + error));
        }
    }
}
</script>

<style scoped>
.login {
    max-width: 1024px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
}
.login-insert{
    width: 60%;
}
.login-insert-msg{
    margin:0;
    font-weight: bold;
    font-size: 3.5rem;
}
.login-insert-img{
    animation: SlideDown 1.5s ease-in-out;
    animation-iteration-count: infinite;
}
.login-insert-msg:last-of-type{
    margin-bottom: 60px;
}
.p-greythin{
    font-weight:lighter;
}
.p-red{
    color: #fbc8c8
}
.login-container {
    box-shadow: 1px 1px 10px #FD2D01;
    padding: 40px;
    border-radius: 20px;
    height: 230px;
    margin-bottom: 70px;
    width: 25%;
}
.login-container-form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
}
.login-container__title{
    color: #FD2D01;
    font-weight:900;
    font-size: 2.5rem;
    margin:0;
}
.login-container__input{
    padding: 10px;
    font-weight: lighter;
    border-radius: 5px;
    border: 0.5px solid #FD2D01;
}
.login-container__btn{
    cursor: pointer;
    padding: 10px;
    font-weight: bold;
    color: white;
    background-color: #FD2D01;
    border-radius: 5px;
    border: none;
}
.login-container__errormsg{
    font-size: 0.9rem;
    margin:0;
    margin-top: 10px;
    text-align: center;
}

@keyframes SlideDown {
    0% {
        transform: translateY(15px);
    }
    50% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(15px);
    }
}
</style>
