<script setup>
import { ref, computed } from "vue";
import PokeModal from "@/components/PokeModal/PokeModal.vue";
import Filters from "@/components/PokeList/Filters.vue";
import NoResults from "@/components/PokeList/NoResults.vue";
import PokemonList from "@/components/PokeList/PokemonList.vue";
import { usePokemonsStore } from "@/store/pokemonsStore.js";

const displayModalDetails = ref(false);
const pokemonsStore = usePokemonsStore();
const { searchedPokemons } = pokemonsStore;

const pokeDetails = computed (() => {
  const { name, height, weight, types, sprites } = pokemonsStore.pokemonDetails;
  const { front_default } = sprites.other["official-artwork"];
  return { name, height, weight, types, image: front_default };
});
</script>

<template>
  <div class="pokemons-container">
    <PokemonList @open-modal="displayModalDetails = true"/>
    <NoResults v-if="searchedPokemons.length === 0" />
    <Filters />
    <PokeModal
      v-if="displayModalDetails"
      :pokeDetails="pokeDetails"
      @close-modal="displayModalDetails = false"
    />
  </div>
</template>

<style scoped lang="scss">
.pokemons-container {
  width: 100%;
  max-width: 100vmax;
  margin: 0 auto;
  background-color: #E8E8E8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 768px) {
  .pokemons-container {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .pokemons-container {
    padding: 0.25rem;
  }
}
</style>
