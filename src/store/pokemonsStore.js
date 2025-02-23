import { defineStore } from "pinia";
import { getPokemons as pokemonsProvider } from "../services/pokemons";

export const usePokemonsStore = defineStore("pokemons", {
  state: () => ({
    pokemons: [],
    pokemonDetails: null,
    favoritePokemons: {},
    nextPage: null,
    previousPage: null,
    loading: false,
    error: null,
  }),
  actions: {
    async getPokemons() {
      this.loading = true;
      this.error = null;
      try {
        const pokemonsInfo = await pokemonsProvider();
        this.pokemons = pokemonsInfo.results;
        this.nextPage = pokemonsInfo.next;
        this.previousPage = pokemonsInfo.previous;
      } catch (err) {
        this.error = err.message || "Failed to fetch Pokémons";
      } finally {
        this.loading = false;
      }
    },
    async getPokemonDetails(pokemonName) {
      try {
        const response = await pokemonsProvider(`/${pokemonName}`);
        this.pokemonDetails = response;
      } catch (err) {
        this.error = err.message || "Failed to fetch Pokémons";
      }
    },
    setFavoritePokemon(pokemonName) {
      if (!this.favoritePokemons) {
        this.favoritePokemons = {};
      }
      this.favoritePokemons[pokemonName] = !this.favoritePokemons[pokemonName];
    },
  },
});