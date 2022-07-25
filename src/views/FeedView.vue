<script setup>
import HeaderLogged from '../components/HeaderLogged.vue';
import Feed from '../components/Feed.vue';
</script>

<template>
    <header id="header">
        <HeaderLogged/> 
    </header>
    <main id="main">
        <Feed/>
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
</style>