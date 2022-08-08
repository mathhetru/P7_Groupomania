<script setup>
import Error from "../components/Error.vue";
</script>

<template>
  <header id="header">
    <Error></Error>
  </header>
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
</style>