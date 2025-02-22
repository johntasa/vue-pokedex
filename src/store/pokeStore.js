import { defineStore } from 'pinia'
import { getPokemons as pokeProvider } from '@/services/pokeService.js'

export const usePokeStore = defineStore('pokemons', {
  state: () => ({
    pokemons: [],
    pokemonDetails: null,
    favoritePokemons: [],
    searchedPokemons: [],
    isFilteredFavorites: false,
    nextPage: null,
    previousPage: null,
    loading: false,
    error: null
  }),
  getters: {
    isFavorite: (state) => (pokemonName) =>
      state.favoritePokemons.some((pokemon) => pokemon.name === pokemonName),
  },
  actions: {
    async getPokemons (pokeAPI) {
      this.loading = true
      this.error = null
      try {
        const pokemonsInfo = await pokeProvider({pokeAPI})
        this.pokemons = [...this.pokemons, ...pokemonsInfo.results]
        this.searchedPokemons = this.pokemons
        this.nextPage = pokemonsInfo.next
        this.previousPage = pokemonsInfo.previous
      } catch (err) {
        this.error = err.message || 'Failed to fetch Pokemons'
      }
    },
    async getPokemonDetails ({pokemonName}) {
      try {
        const response = await pokeProvider({ pokemonName: `/${pokemonName}`})
        this.pokemonDetails = response
      } catch (err) {
        this.error = err.message || 'Failed to fetch Pokemon Details'
      }
    },
    toggleFavoritePokemon (pokemon) {
      if (this.isFavorite(pokemon.name)) {
        this.favoritePokemons = this.favoritePokemons.filter(
          (favPokemon) => favPokemon.name !== pokemon.name
        )
        return
      }
      this.favoritePokemons.push(pokemon)
    },
    searchPokemons (query) {
      if (!query) {
        this.searchedPokemons = this.pokemons;
        return;
      }
      const normalizedQuery = query.trim().toLowerCase()
      this.searchedPokemons = this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(normalizedQuery)
      )
    },
    toggleFilters (filter) {
      if (filter === 'all') {
        this.searchedPokemons = this.pokemons
        this.isFilteredFavorites = false
        return
      }
      this.searchedPokemons = this.favoritePokemons
      this.isFilteredFavorites = true
    }
  },
  persist: {
    paths: ['pokemons', 'favoritePokemons', 'searchedPokemons'],
    storage: sessionStorage
  }
})
