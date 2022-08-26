<script setup>
import HeaderLogged from '../components/HeaderLogged.vue';
import Feed from '../components/Feed.vue';
import Publication from '../components/Publication.vue';
</script>

<template>
    <header id="header">
        <HeaderLogged/> 
    </header>
    <span class="header-line"></span>
    <main id="main">
        <Feed/>
        <Publication/>
    </main>
</template>

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
.header-line{
    display: block;
    background-color: #d1d2d6;
    height:1.5px;
    width: 100%;
}

/* TABLET */
@media screen and (max-width: 1100px) {
    #header{
        margin: 0 50px;
    }
}

/* MOBILE */
@media screen and (max-width: 615px) {
    #header{
        flex-direction: column;
        height: 190px;
        margin: 30px 0;
    }
    .header-line{
        margin-top:30px;
    }
}
</style>