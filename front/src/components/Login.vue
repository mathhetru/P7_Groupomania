<template>
    <div class="login">
        <div class="login-insert">
            <p class="login-insert-msg">Bienvenue</p>
            <p class="login-insert-msg p-greythin">Sur votre réseau social</p>
            <p class="login-insert-msg p-red">Groupomania intranet</p>
            <img src="../assets/img-accueil.svg" alt="Groupomania-image-accueil" class="login-insert-img"/>
        </div> 
        <div class="login-container">
            <form class="login-container-form" @submit="logUser">
                <p class="login-container__title">Groupomania</p>
                <div>
                    <span id="connectErrorMsg" v-show="errorEmail" class="login-container__errormsg">Champ invalide, veuillez vérifier votre email.</span>
                    <input type="text" v-model="emailLogin" name="emailLogin" id="emailLogin" class="login-container__input" placeholder="Adresse e-mail" aria-label="Adresse email">
                </div>
                <div>
                    <span id="connectErrorMsg" v-show="errorPassword" class="login-container__errormsg">Paire mot de passe et adresse mail incorrecte.</span>
                    <input type="password" v-model="passwordLogin" name="passwordLogin" id="passwordLogin" class="login-container__input" placeholder="Mot de passe" aria-label="Mot de passe">
                </div>
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
            emailLogin: "",
            passwordLogin: "",
            errorEmail: false,
            errorPassword: false
        }
    },
    methods: {
        logUser(e) {
            e.preventDefault();
            var emailRegExp = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

            if (this.emailLogin === "" || this.passwordLogin === "") {
                alert("Vous devez remplir le formulaire pour vous inscrire !");
                return;
            } else {
                this.errorEmail = !emailRegExp.test(this.emailLogin);
                this.errorPassword = !(this.passwordLogin.length >= 8);
            };

            if (this.errorEmail || this.errorPassword) {
                // Un champ n'est pas bon
                return;
            }

            axios.post("http://localhost:3000/api/auth/login", { email: this.emailLogin, password: this.passwordLogin })
                .then(function (response) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);
                    router.push("feed");
                    })
                .catch(error => alert("Erreur : " + error));
        }
    }
}
</script>

<style scoped>
/* LAPTOP */ 
.login {
    max-width: 1024px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 60px 0;
}

/* WELCOME TEXT */
.login-insert{
    width: 60%;
}
.login-insert-msg{
    margin:0;
    font-weight: bold;
    font-size: 3.5rem;
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

/* IMAGE */ 
.login-insert-img{
    animation: SlideDown 1.5s ease-in-out;
    animation-iteration-count: infinite;
}

/* ANIMATION IMAGE */
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


/* FORM */
.login-container {
    box-shadow: 1px 1px 10px #FD2D01;
    padding: 40px;
    border-radius: 20px;
    height: 230px;
    margin-bottom: 70px;

}
.login-container-form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 210px;
}
.login-container__title{
    color: #FD2D01;
    font-weight:900;
    font-size: 2.5rem;
    margin:0;
}
.login-container__input{
    width: calc(100% - 20px);
    font-weight: lighter;
    border-radius: 5px;
    border: 0.5px solid #FD2D01;
}
.login-container__input[type="text"], .login-container__input[type="password"]{
    padding: 10px;
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
    display: block;
    font-size: 0.65rem;
    margin:0;
}

@media screen and (max-width: 1024px) {
    .login{
        margin: 60px 50px;
    }
}

/* TABLET */
@media screen and (max-width: 768px) {
    .login{
        flex-direction: column;
        margin-top: 10px;
    }

    /* WELCOME TEXT */
    .login-insert{
        width: 90%;
        text-align: center;
    }

    /* IMAGE */ 
    .login-insert-img{
        width: 50%;
    }

    /* FORM */ 
    .login-container {
        margin-top: 70px;
        width: auto;
    }
}

/* MOBILE */
@media screen and (max-width: 425px) {
    .login{
        flex-direction: column;
        margin-top: 10px;
    }

    /* WELCOME TEXT */
    .login-insert{
        margin-top: 30px;
        width: 100%;
        text-align: center;
    }
    .login-insert-msg{
        font-size: 2.3rem;
    }

    /* IMAGE */ 
    .login-insert-img{
        width: 100%;
    }

    /* FORM */ 
    .login-container {
        width: auto;
        margin: 80px 30px;
    }
    .login-container__title{
        font-size: 2rem;
    }
    .login-container__input{
        width: calc(100% - 20px);
    }
}
</style>
