import { defineStore } from "pinia";
import { getPokemons } from "../services/pokemons";

export const usePokemonsStore = defineStore("pokemons", {
  state: () => ({
    pokemons: [],
    nextPage: null,
    previousPage: null,
    loading: false,
    error: null,
  }),
  actions: {
    async getPokemons(url) {
      this.loading = true;
      this.error = null;
      try {
        const pokemonsInfo = await getPokemons(url);
        this.pokemons = pokemonsInfo.results;
        this.nextPage = pokemonsInfo.next;
        this.previousPage = pokemonsInfo.previous;
      } catch (err) {
        this.error = err.message || "Failed to fetch Pokémons";
      } finally {
        this.loading = false;
      }
    },
  },
});