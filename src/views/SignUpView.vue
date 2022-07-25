<script setup>
import HeaderSignUp from "../components/HeaderSignUp.vue";
import SignUp from "../components/SignUp.vue";
</script>

<template>
  <header id="header">
    <HeaderSignUp></HeaderSignUp>
  </header>
  <main id="main">
    <SignUp />
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