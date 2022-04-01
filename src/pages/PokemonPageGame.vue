<template>
<h1 v-if="!pokemon">Espere por favor</h1>
<div v-else>
    <h1>¿Quien es ese pokemon?</h1>
    <PokemonPictures :pokemonid="pokemon.id" :showPokemon="showPokemon"/>
    <PokemonOption :pokemons="pokemonArr"
    @selection-pokemon="checkAnswer" />
</div>
</template>

<script>
import  PokemonOption from '@/components/PokemonOption'
import  PokemonPictures from '@/components/PokemonPictures'
import getPokemonOptions from '@/helpers/getPokemonOptions'
console.log(getPokemonOptions)
export default ({
    components: {PokemonOption,PokemonPictures},
    data(){
        return{
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
        }
    },
    methods: {
        async mixPokemonArray(){ 
             this.pokemonArr = await getPokemonOptions()

             const rndInt = Math.floor(Math.random()*4)
             this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(){
            this.showPokemon = true

            if( selectedId === this.pokemon.id ) {
                this.message = `Correcto, ${ this.pokemon.name }`
            } else {
                this.message = `Oops, era ${ this.pokemon.name }`
            }
        }
    },
    mounted(){
        this.mixPokemonArray()
    }
})
</script>
<style>

</style>
