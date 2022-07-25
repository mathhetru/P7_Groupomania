<template>
    <div>
        <p class="test" @click="increment" >Increment</p> <!--- v-on:click fonctionne comme @click--->
        <p class="test_p" >{{ counter }}</p>
        <input type="text" v-model="message" :style="style()"> <!--- :value fonctionne comme v-model --->
        <input type="checkbox" v-model="success">
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'Counter',
    data() {
        return {
        message: 'salut les gens',
        success: false,
        counter: 0,
    }
},
    methods: {
        increment() {
            this.counter += 1 // le this permet d'avoir accès à toutes les propriétés injectées au niveau de notre vue dans data
        },
        style() {
            if (this.success) {
                return {background: '#00FF00'} 
            } else { 
                return {background: 'black'}
            }
        }
    },
}
</script>

<style>
.test {
    color: red;
    font-size: 3rem;
}
</style>
