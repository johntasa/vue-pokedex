<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { usePokeStore } from "@/store/pokeStore.js";
import { storeToRefs } from "pinia";
import PokeItem from "./PokeItem.vue";

const pokeStore = usePokeStore();
const emit = defineEmits(["open-modal"]);
const searchInput = ref("");
const observer = ref(null);
const { searchedPokemons, loading, error, nextPage, isFilteredFavorites } = storeToRefs(pokeStore);

const openPokemonDetails = async (pokemonName) => {
  await pokeStore.getPokemonDetails({pokemonName});
  emit("open-modal");
};

watch(searchInput, (value) => {
  pokeStore.searchPokemons(value);
});

onMounted(async () => {
  const options = {
    root: null,
    rootMargin: "200px",
    threshold: 0.1,
  };

  observer.value = new IntersectionObserver(async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !loading.value && nextPage.value && !searchInput.value && !isFilteredFavorites.value) {
      await pokeStore.getPokemons(nextPage.value);
      loading.value = false;
    }
  }, options);

  const sentinel = document.querySelector(".scroll-sentinel");
  if (sentinel) {
    observer.value.observe(sentinel);
  }
  loading.value = false;
});


onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
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
        :key="pokemon.name"
        :pokemon="pokemon"
        @click="openPokemonDetails(pokemon.name)"
      />
    </ul>
    <div class="scroll-sentinel"></div>
    <div v-if="loading">
      Loading Pokemons...
    </div>
    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.pokemon-list {
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Roboto', sans-serif;

  &__search-input {
    width: 100%;
    max-width: 570px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
    padding: 0 16px 0 36px;
    margin: 0.5rem 0;
    font-size: 16px;
    color: #353535;
    background-image: url('/Search.svg');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    &::placeholder {
      color: #BFBFBF;
    }

    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 1px 4px rgba(74, 144, 226, 0.2);
    }
  }

  &__items {
    list-style-type: none;
    padding: 0;
    margin-block: 20px;
    width: 100%;
    max-width: 570px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
  }
  
  .scroll-sentinel {
    width: 100%;
    height: 20px;
    margin: 1rem 0;
  }
  
  div[v-if="loading"], 
  div[v-if="error"] {
    margin: 1rem 0;
    padding: 1rem;
    text-align: center;
    width: 100%;
  }
}
</style>