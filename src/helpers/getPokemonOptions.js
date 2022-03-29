import pokemonAPI from "@/api/pokemonAPI"


const getPokemons = () => {
    const pokemonsArr = Array.from(Array(650))
    return pokemonsArr.map((_, index)=> index+1)
}

const getPokemonOptions = async() => {
    const mixedPokemons = getPokemons().sort(Math.random()-0.5)
    const pokemons = await getPokemonName(mixedPokemons.splice(0,4))
    return pokemons
}

const getPokemonName = async({a,b,c,d}= []) => {
    //const resp = await pokemonAPI.get(`/$1`)
    //console.log(resp)
    const promiseArr = [
        pokemonAPI(`/${a}`),
        pokemonAPI(`/${b}`),
        pokemonAPI(`/${c}`),
        pokemonAPI(`/${d}`),
    ]
    const [p1,p2,p3,p4] = await Promise.all(promiseArr)
    return [
        {name: p1.data.name, id: p1.data.id},
        {name: p2.data.name, id: p2.data.id},
        {name: p3.data.name, id: p3.data.id},
        {name: p4.data.name, id: p4.data.id},
    ]
}

export default getPokemonOptions;