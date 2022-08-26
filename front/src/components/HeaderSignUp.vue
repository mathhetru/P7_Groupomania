<template> 
    <a href="signup">
        <img src="../assets/Groupomania-logo.svg" alt="Groupomania-logo" class="header__logo"/>
    </a>
    <div class="header-nav">
        <a href="login" class="header-nav-btn" aria-label="bouton s'identifier">
            <p class="header-nav-btn__title">S'identifier</p>
        </a>
        <a href="signup" class="header-nav-btn-hov" aria-label="bouton s'inscrire">
            <p class="header-nav-btn__title">S'inscrire</p>
        </a>
    </div>   
</template>

<script>
export default {
    name: 'HeaderSignUp',
    methods: {
        /*login() {
            var string = window.location.href;
            var url = new URL(string);
            
            if (url.pathname == "/login") {
                return {
                    color: 'white',
                    'background-color': '#FD2D01'
                }
            } else {
                    return {
                    color: '#FD2D01',
                    'background-color': 'white'}
                }
            },
        signup() {
            var string = window.location.href;
            var url = new URL(string);
            
            if (url.pathname == "/signup") {
                return {
                    color: 'white',
                    'background-color': '#FD2D01'
                }
            } else {
                    return {
                    color: '#FD2D01',
                    'background-color': 'white'}
                }
        },
        loginC() {
            var string = window.location.href;
            var url = new URL(string);
            
            if (url.pathname == "/login") {
                return 'header-nav-btn-hov'
            } else {
                return 'header-nav-btn'
            }
        },
        signupC() {
            var string = window.location.href;
            var url = new URL(string);
            
            if (url.pathname == "/signup") {
                return 'header-nav-btn-hov'
            } else {
                return 'header-nav-btn'
            }
        }*/
    }
}
</script>

<style scoped>
/* LAPTOP */ 
.header__logo{
    width: 60px;
}
.header-nav{
    display: flex;
    justify-content: space-between;
    width: 250px;
}
.header-nav-btn{
    display: block;
    text-decoration: none;
    color: #FD2D01;
    font-weight: bold;
    width: 110px;
    height: 39px;
    border-radius: 30px;
    border: 2px solid #FD2D01;
}
.header-nav-btn-hov{
    display: block;
    text-decoration: none;
    color: white;
    background-color: #FD2D01;
    font-weight: bold;
    width: 110px;
    height: 39px;
    border-radius: 30px;
    border: 2px solid #FD2D01;
}
.header-nav-btn:hover{
    color: white;
    background-color: #FD2D01;
    transition: 0.2s linear;
}
.header-nav-btn__title{
    text-align: center;
    margin: 0;
    margin-top: 9px;
}

/* TABLET */ 
@media screen and (max-width: 425px) {
    .header-nav{
        width: 280px;
    }
}
</style>
