<template>
    <div>
        <ul>
            <li v-for="person in persons">{{ person | capitalize }}</li>
            <button @click="addPerson"> Ajoute une personne </button>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'List',
    data () {
        return {
        persons: ['joe', 'michel', 'henri', 'james']
        }
    },
    methods: {
        addPerson: function(){
            this.persons.push('Julie')
        }
    },
    mounted: function(){
        console.log(this.$el)
    }
}
</script>

<style>
li {
    color: red;
    font-size: 1 rem;
    
}
</style>
