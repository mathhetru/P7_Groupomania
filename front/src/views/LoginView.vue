<script setup>
import HeaderLogin from "../components/HeaderLogin.vue";
import Login from "../components/Login.vue";
</script>

<template>
  <header id="header">
    <HeaderLogin></HeaderLogin>
  </header>
  <main id="main">
    <Login />
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