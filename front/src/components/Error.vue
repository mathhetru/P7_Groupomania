<template>
    <header id="header">
        <a href="signup">
            <img src="../assets/Groupomania-logo.svg" alt="Groupomania-logo" class="header__logo"/>
        </a>
    </header>
    <main id="main">
        <div class="error">
            Erreur 404
        </div>
    </main>  
</template>

<script>
export default {
    name: 'Errortest',
    data() {
    }
}
</script>

<style scoped>
#header{
    position: sticky;
    max-width: 1024px;
    margin: auto;
    display: flex;
    height: 180px;
    align-items: center;
    justify-content: space-between;
}
#main{
    max-width: 1024px;
    margin: auto;
    padding-top: 20px;
}
.error{
    max-width: 1024px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
}
.header__logo{
    width: 60px;
}
</style>
