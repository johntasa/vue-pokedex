import { defineStore } from 'pinia'
import { getPokemons as pokeProvider } from '@/services/pokeService.js'

export const usePokeStore = defineStore('pokemons', {
  state: () => ({
    pokemons: [],
    pokemonDetails: null,
    favoritePokemons: [],
    searchedPokemons: [],
    nextPage: null,
    previousPage: null,
    loading: false,
    error: null
  }),
  actions: {
    async getPokemons () {
      this.loading = true
      this.error = null
      try {
        const pokemonsInfo = await pokeProvider()
        this.pokemons = pokemonsInfo.results
        this.searchedPokemons = pokemonsInfo.results
        this.nextPage = pokemonsInfo.next
        this.previousPage = pokemonsInfo.previous
      } catch (err) {
        this.error = err.message || 'Failed to fetch Pokemons'
      } finally {
        this.loading = false
      }
    },
    async getPokemonDetails (pokemonName) {
      try {
        const response = await pokeProvider(`/${pokemonName}`)
        this.pokemonDetails = response
      } catch (err) {
        this.error = err.message || 'Failed to fetch Pokemon Details'
      }
    },
    setFavoritePokemon (pokemon) {
      if (this.favoritePokemons.includes(pokemon)) {
        this.favoritePokemons = this.favoritePokemons.filter(
          (favPokemon) => favPokemon !== pokemon
        )
        return
      }
      this.favoritePokemons.push(pokemon)
    },
    searchPokemons (query) {
      this.searchedPokemons = this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      )
    }
  }
})
