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
                <div>
                    <span id="connectErrorMsg" v-show="errorFirstName" class="signup-container__errormsg">Champ invalide, veuillez vérifier votre prénom.</span>
                    <input type="text" v-model="firstNameSignup" class="signup-container__input" placeholder="Prénom" aria-label="Prénom">
                </div>
                <div>
                    <span id="connectErrorMsg" v-show="errorLastName" class="signup-container__errormsg">Champ invalide, veuillez vérifier votre nom.</span>
                    <input type="text" v-model="lastNameSignup" class="signup-container__input" placeholder="Nom" aria-label="Nom">
                </div>
                <div>
                    <span id="connectErrorMsg" v-show="errorJob" class="signup-container__errormsg">Champ invalide, veuillez vérifier votre job dans l'entreprise.</span>
                    <input type="text" v-model="jobSignup" class="signup-container__input" placeholder="Job chez Groupomania" aria-label="Job">
                </div>
                <div>
                    <span id="connectErrorMsg" v-show="errorEmail" class="signup-container__errormsg">Champ invalide, veuillez vérifier votre email.</span>
                    <input type="text" v-model="emailSignup" class="signup-container__input" placeholder="Adresse e-mail" aria-label="Adresse email">
                </div>
                <div>
                    <span id="connectErrorMsg" v-show="errorPassword" class="signup-container__errormsg">Votre mot de passe doit contenir 8 caractères minimum.</span>
                    <input type="password" v-model="passwordSignup" class="signup-container__input" placeholder="Mot de passe" aria-label="Mot de passe">
                </div>
                <button type="submit" class="signup-container__btn">S'inscrire</button>
            </form>
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
            firstNameSignup: "",
            lastNameSignup: "",
            jobSignup: "", 
            emailSignup: "",
            passwordSignup: "",
            errorFirstName: false,
            errorLastName: false,
            errorJob: false,
            errorEmail: false,
            errorPassword: false
        }

    },
    methods: {
        createUser(e) {
            e.preventDefault();
            var nameRegExp = new RegExp("^[A-zÀ-ú \-]+$");
            var emailRegExp = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

            if (this.firstNameSignup === "" || this.lastNameSignup === "" || this.jobSignup === "" || this.emailSignup === "" || this.passwordSignup === "") {
                alert("Vous devez remplir le formulaire pour vous inscrire !");
                return;
            } else {
                this.errorFirstName = !nameRegExp.test(this.firstNameSignup);
                this.errorLastName = !nameRegExp.test(this.lastNameSignup);
                this.errorJob = !nameRegExp.test(this.jobSignup);
                this.errorEmail = !emailRegExp.test(this.emailSignup);
                this.errorPassword = !(this.passwordSignup.length >= 8);
            };

            if (this.errorFirstName || this.errorLastName || this.errorJob || this.errorEmail || this.errorPassword) {
                // Un champ n'est pas bon
                return;
            }

            axios.post('http://localhost:3000/api/auth/signup', { 
                firstname: this.firstNameSignup,
                lastname: this.lastNameSignup,
                job: this.jobSignup,
                email: this.emailSignup, 
                password: this.passwordSignup })
                .then(function (response) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);
                    router.push('feed');
                })
                .catch(error => alert("Erreur : " + error));
        }
    }
    /* methods: {
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
    mounted: 
        function() {
            const emailSignup = this.emailSignup;
            const passwordSignup = this.passwordSignup;
            axios
            .post('http://localhost:3000/api/auth/signup', { email: emailSignup, password: passwordSignup })
            .then(function (response) {
                localStorage.setItem("userId", response.data.userId);
                router.push('/feed');
                console.log('titi');
            })
            .catch(error => alert("Erreur : " + error));
        }*/
    
}

</script>

<style scoped>
/* LAPTOP */ 
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
.signup-insert-msg:last-of-type{
    margin-bottom: 60px;
}
.p-greythin{
    font-weight:lighter;
}
.p-red{
    color: #fbc8c8
}

/* IMAGE */ 
.signup-insert-img{
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
.signup-container {
    box-shadow: 1px 1px 10px #FD2D01;
    padding: 40px;
    border-radius: 20px;
    margin-bottom: 70px;
}
.signup-container-form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 380px;
}
.signup-container__title{
    color: #FD2D01;
    font-weight:900;
    font-size: 2.5rem;
    margin:0;
}
.signup-container__input{
    width: calc(100% - 20px);
    font-weight: lighter;
    border-radius: 5px;
    border: 0.5px solid #FD2D01;
}
.signup-container__input[type="text"], .signup-container__input[type="password"]{
    padding: 10px;
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
    display: block;
    font-size: 0.65rem;
    margin:0;
}

@media screen and (max-width: 1024px) {
    .signup{
        margin: 60px 50px;
    }
}

/* TABLET */
@media screen and (max-width: 768px) {
    .signup{
        flex-direction: column;
        margin-top: 10px;
    }

    /* WELCOME TEXT */
    .signup-insert{
        width: 90%;
        text-align: center;
    }

    /* IMAGE */ 
    .signup-insert-img{
        width: 50%;
    }

    /* FORM */ 
    .signup-container {
        margin-top: 70px;
        width: auto;
    }
}

/* MOBILE */
@media screen and (max-width: 425px) {
    .signup{
        flex-direction: column;
        margin-top: 10px;
    }

    /* WELCOME TEXT */
    .signup-insert{
        margin-top: 30px;
        width: 100%;
        text-align: center;
    }
    .signup-insert-msg{
        font-size: 2.3rem;
    }

    /* IMAGE */ 
    .signup-insert-img{
        width: 100%;
    }

    /* FORM */ 
    .signup-container {
        width: auto;
        margin: 80px 30px;
    }
    .signup-container__title{
        font-size: 2rem;
    }
    .signup-container__input{
        width: calc(100% - 20px);
    }
}
</style>
