<template>
<h1 v-if="!pokemon">Espere por favor</h1>
<div v-else>
    <h1>¿Quien es ese pokemon?</h1>
    <PokemonPicture :pokemon-id="pokemon.id" 
    :show-pokemon="showPokemon"/>

    <PokemonOptions :pokemons="pokemonArr"
    @selection-pokemon="checkAnswer" />
    
    
    <!--<ContadorVidas/>-->
    <template id="template" v-if="showAnswer">
        <h2 class="fade-in"> {{message}}</h2>
        <button @click="newGame">
                Nuevo Juego
        </button>
       
    </template>
    <h4>Vidas: <p>{{vidas}}</p></h4>
    <h4>Intentos <p>{{intentos}}</p></h4>
</div>
      
</template>

<script>
import  PokemonOptions from '@/components/PokemonOption'
import  PokemonPicture from '@/components/PokemonPictures'
import getPokemonOptions from '@/helpers/getPokemonOptions'
console.log(getPokemonOptions)
export default ({
    components: {
        PokemonOptions,
        PokemonPicture},
    data(){
        return{
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: '',
            vidas: 3,
            intentos: 0
        }
    },
    methods: {
        async mixPokemonArray(){ 
             this.pokemonArr = await getPokemonOptions()

             const rndInt = Math.floor(Math.random()*4)
             this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer(selectedId){
            this.showPokemon = true
            this.showAnswer = true
            if( selectedId === this.pokemon.id) {
                this.message = `Correcto, ${ this.pokemon.name }`
                this.intentos++
            } else {
                this.message = `Oops, era ${ this.pokemon.name }`
                this.intentos++;
                this.vidas--
            }
            if(this.intentos == 6 && this.vidas>0){
                alert("Has Ganado, juego terminado")
                setInterval(location.reload())
            }
            if(this.vidas == 1){
                alert("Cuidado solo te queda una vida")
            }
            if(this.vidas == 0){
                alert("GAME OVER, se reiniciara tu vida")
                setInterval(location.reload())
            }
        },
        newGame(){
         
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonArr = []
            this.pokemon = null
            this.mixPokemonArray()
        }
    },
    mounted(){
        this.mixPokemonArray()
    }
})
</script>
<style>
    #templete{
        margin-top: 1300px;
    }
</style>
