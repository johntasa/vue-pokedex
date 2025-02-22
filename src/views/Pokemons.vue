<script setup>
import { ref, onMounted, computed } from "vue";
import { usePokemonsStore } from "../store/pokemonsStore.js";

const pokemonsStore = usePokemonsStore();
const pokemonsList = ref([]);
const searchInput = ref("");
const selectedPokemons = ref({});

onMounted(() => {
  pokemonsList.value = pokemonsStore.pokemons;
});

const getPokemonID = (url) => {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
};

const capitalizePokemon = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const openPokemonDetails = (pokemonName) => {
  console.log(pokemonName);
};

const filteredPokemons = computed(() => {
  if (!searchInput.value) return pokemonsList.value;
  return pokemonsList.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
});

const handleButtonClick = (event, pokemonName) => {
  event.stopPropagation();
  selectedPokemons.value[pokemonName] = !selectedPokemons.value[pokemonName];
};
</script>

<template>
  <div class="pokemon-list">
    <input
      class="pokemon-list__search-input"
      type="text"
      placeholder="Search"
      v-model="searchInput"
    />
    <ul>
      <li
        v-for="pokemon in filteredPokemons"
        :key="getPokemonID(pokemon.url)"
        @click="openPokemonDetails(pokemon.name)"
      >
        <div class="pokemon-list__pokemon">
          <p>{{ capitalizePokemon(pokemon.name) }}</p>
          <button
            class="pokemon-list__pokemon--favorite"
            @click="handleButtonClick($event, pokemon.name)"
          >
            <img
              :src="selectedPokemons[pokemon.name] ? '/Active.svg' : '/Disabled.svg'"
              alt="Icon of a star"
            />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.pokemon-list {
  background-color: #E8E8E8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &__search-input {
    width: 570px;
    height: 50px;
    border-radius: 5px;
    border: none;
    padding: 0 20px;
    margin: 2rem 0;
    color: #BFBFBF;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:active {
        transform: scale(0.98);
      }
    }
  }

  &__pokemon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 570px;
    height: 60px;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 0 20px;
    margin-bottom: 0.5rem;
    &:hover {
      background-color: #BFBFBF;
    }
  }
}
</style>