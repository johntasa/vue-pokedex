<script setup>
import { ref, watch } from "vue";
import { usePokeStore } from "@/store/pokeStore.js";
import { storeToRefs } from "pinia";
import PokeItem from "./PokeItem.vue";

const pokeStore = usePokeStore();
const emit = defineEmits(["open-modal"]);
const searchInput = ref("");
const { searchedPokemons } = storeToRefs(pokeStore);

const openPokemonDetails = async (pokemonName) => {
  await pokeStore.getPokemonDetails(pokemonName);
  emit("open-modal");
};

const getPokemonID = (url) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
};

watch(searchInput, (value) => {
  pokeStore.searchPokemons(value);
});
</script>

<template>
  <div class="pokemon-list">
    <input
      class="pokemon-list__search-input"
      type="text"
      placeholder="Search"
      name="search"
      v-model="searchInput"
      aria-label="Search Pokemon"
    />
    <ul class="pokemon-list__items">
      <PokeItem
        v-for="pokemon in searchedPokemons"
        :key="getPokemonID(pokemon.url)"
        :pokemon="pokemon"
        @click="openPokemonDetails(pokemon.name)"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
.pokemon-list {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Roboto', sans-serif;

  &__search-input {
    width: 100%;
    max-width: 530px;
    height: 50px;
    border-radius: 5px;
    border: none;
    padding: 0 20px;
    margin: 2rem;
    font-size: 16px;
    color: #353535;
    background-image: url('/Search.svg');
    background-repeat: no-repeat;
    background-position: 10px center;

    &::placeholder {
      color: #BFBFBF;
      padding-left: 20px;
    }
  }

  &__items {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 570px;
  }
}

@media (max-width: 480px) {
  .pokemon-list {
    padding: 30px;
  }
}
</style>