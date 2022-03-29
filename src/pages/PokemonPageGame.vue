<template>
    <h1>¿Quien es ese pokemon?</h1>
    <PokemonPictures :pokemonId="40" :showPokemon="true"/>
    <PokemonOption/>
</template>

<script>
import  PokemonOption from '@/components/PokemonOption'
import  PokemonPictures from '@/components/PokemonPictures'
import getPokemonOptions from '@/helpers/getPokemonOptions'
console.log(getPokemonOptions)
export default ({
    components: {PokemonOption,PokemonPictures}
})
</script>
<style>

</style>
