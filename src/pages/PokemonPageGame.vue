<template>
  <h1 v-if="vidas == 0">
    Juego Terminado
    <span>puntaje: {{ score }}</span>
    <div class="boton">
      <button id="empezar" @click="empezar">Empezar de Nuevo</button>
    </div>
  </h1>
  <div  v-if="vidas != 0" id="borrar">
    <h1 id="esperar" v-if="!pokemon">Esperando...!</h1>
    <div v-else>
      <h1 v-if="vidas != 0">¿Quien es ese pokemon?</h1>
      <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />

      <PokemonOptions :pokemons="pokemonArr" @selection-pokemon="checkAnswer" />

      <!--<ContadorVidas/>-->
      <template id="template" v-if="showAnswer">
        <h2 class="fade-in">{{ message }}</h2>
        <button @click="newGame">Continuar</button>
      </template>

      <div v-else>
        <h4>
          Vidas:
          <p>{{ vidas }}</p>
        </h4>
        <h4>
          score
          <p>{{ score }}</p>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOption";
import PokemonPicture from "@/components/PokemonPictures";
import getPokemonOptions from "@/helpers/getPokemonOptions";
console.log(getPokemonOptions);
export default {
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
      vidas: 3,
      score: 0,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();

      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    empezar() {
      window.location.reload();
    },
    checkAnswer(selectedId) {
      this.showPokemon = true;
      this.showAnswer = true;
      if (selectedId === this.pokemon.id) {
        this.message = `Correcto, ${this.pokemon.name}`;
        this.score++;
      } else {
        this.message = `Oops, era ${this.pokemon.name}`;
        this.vidas--;
      }
      if (this.vidas == 0) {
        this.showPokemon = false;
        this.showAnswer = false;
        this.pokemonArr = [];
        this.pokemon = null;
      }
    },
    newGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonArr = [];
      this.pokemon = null;
      this.mixPokemonArray();
      
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>
<style>
#templete {
  margin-top: 1300px;
}
.boton {
  margin-top: 50px;
}
</style>
