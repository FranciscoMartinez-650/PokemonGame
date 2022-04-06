<template>
<h1 v-if="vidas==0">
    Juego Terminado 
    <span>puntaje: {{score}}</span>
    <button id="empezar" @click="empezar">Empezar de Nuevo</button>
    </h1>

<h1 v-if="!pokemon">Espere por favor</h1>
<div v-else>
    <h1 v-if="vidas!= 0">¿Quien es ese pokemon?</h1>
    <PokemonPicture :pokemon-id="pokemon.id" 
    :show-pokemon="showPokemon"/>

    <PokemonOptions :pokemons="pokemonArr"
    @selection-pokemon="checkAnswer" />
    
    
    <!--<ContadorVidas/>-->
    <template id="template" v-if="showAnswer">
        <h2 class="fade-in"> {{message}}</h2>
        <button @click="newGame">
                Continuar
        </button>
       
    </template>

    
   
    <div v-else>
    <h4>Vidas: <p>{{vidas}}</p></h4>
    <h4>score<p>{{score}}</p></h4>
    </div>
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
            score: 0
        }
    },
    methods: {
        async mixPokemonArray(){ 
             this.pokemonArr = await getPokemonOptions()

             const rndInt = Math.floor(Math.random()*4)
             this.pokemon = this.pokemonArr[rndInt]
        },
        empezar(){
           window.location.reload()
        },
        checkAnswer(selectedId){
            this.showPokemon = true
            this.showAnswer = true
            if( selectedId === this.pokemon.id) {
                this.message = `Correcto, ${ this.pokemon.name }`
                this.score++
            } else {
                this.message = `Oops, era ${ this.pokemon.name }`
                this.vidas--
            }
            if(this.vidas == 0){
            this.showPokemon = false
            this.showAnswer = false
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
    #empezar{
        margin-left: 30px;
        
    }
</style>
