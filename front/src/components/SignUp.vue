<template>
    <div class="signup">
        <div class="signup-insert">
            <p class="signup-insert-msg">
                Bienvenue
            </p>
            <p class="signup-insert-msg p-greythin">
                sur votre réseau social
            </p>
            <p class="signup-insert-msg p-red">
                Groupomania-intranet
            </p>
            <img src="../assets/img-accueil.svg" alt="Groupomania-image-accueil" class="signup-insert-img"/>
        </div>
        <div class="signup-container">
            <form class="signup-container-form" @submit="createUser">
                <p class="signup-container__title">
                    Groupomania
                </p>
                <input type="text" v-model="emailSignup" name="emailSignup" class="signup-container__input" placeholder="Adresse e-mail" aria-label="Adresse email">
                <input type="password" v-model="passwordSignup" name="passwordSignup" class="signup-container__input" placeholder="Mot de passe" aria-label="Mot de passe">
                <button type="submit" class="signup-container__btn">S'inscrire</button>
            </form>
            <p id="connectErrorMsg" class="signup-container__errormsg"><!-- Adresse mail ou mot de passe incorrect.--></p>
        </div>
    </div> 
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
    name: 'SignUp',
    data() {
        return {
            emailSignup: "",
            passwordSignup: "",
        }
    },
    methods: {
        async createUser() {
            try {
            const emailSignup = this.emailSignup;
            const passwordSignup = this.passwordSignup;
            await axios.post('http://localhost:3000/api/auth/signup', { email: emailSignup, password: passwordSignup })
            .then(function (response) {
                localStorage.setItem("userId", response.data.userId);
                router.push('/feed');
                console.log('titi');
            })
            .catch(error => alert("Erreur : " + error));
            } catch (error) {
                console.log(error)
            }

        }
    }
}
</script>

<style scoped>
.signup {
    max-width: 1024px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
}
.signup-insert{
    width: 60%;
}
.signup-insert-msg{
    margin:0;
    font-weight: bold;
    font-size: 3.5rem;
}
.signup-insert-img{
    animation: SlideDown 1.5s ease-in-out;
    animation-iteration-count: infinite;
}
.signup-insert-msg:last-of-type{
    margin-bottom: 60px;
}
.p-greythin{
    font-weight:lighter;
}
.p-red{
    color: #fbc8c8
}
.signup-container {
    box-shadow: 1px 1px 10px #FD2D01;
    padding: 40px;
    border-radius: 20px;
    height: 230px;
    margin-bottom: 70px;
    width: 25%;
}
.signup-container-form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
}
.signup-container__title{
    color: #FD2D01;
    font-weight:900;
    font-size: 2.5rem;
    margin:0;
}
.signup-container__input{
    padding: 10px;
    font-weight: lighter;
    border-radius: 5px;
    border: 0.5px solid #FD2D01;
}
.signup-container__btn{
    cursor: pointer;
    padding: 10px;
    font-weight: bold;
    color: white;
    background-color: #FD2D01;
    border-radius: 5px;
    border: none;
}
.signup-container__errormsg{
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
