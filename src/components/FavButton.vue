<script setup>
import { usePokemonsStore } from "../store/pokemonsStore.js";
import { onMounted, computed } from "vue";

const pokemonsStore = usePokemonsStore();
const favoritePokemons = pokemonsStore.favoritePokemons;

const props = defineProps({
  pokemon: {
    type: Object,
    default: () => {},
    required: true,
  },
});

const isFavorite = computed(() => favoritePokemons[props.pokemon.name]);

const setFavorite = (event, pokemonName) => {
  event.stopPropagation();
  pokemonsStore.setFavoritePokemon(pokemonName);
};

</script>

<template>
  <button
    class="favorite-button"
    @click="setFavorite($event, pokemon.name)"
    type="button"
  >
    <img
      :class="{ 'favorite-button__icon--active': isFavorite }"
      class="favorite-button__icon"
      :src="isFavorite ? '/Active.svg' : '/Disabled.svg'"
      alt="Icon of a star"
    />
  </button>
</template>

<style scoped lang="scss">
  .favorite-button {
    background-color: transparent;
    border: none;

    &__icon {
      cursor: pointer;
      &:active {
        transform: rotate(0.5turn);
      }

      &--active {
        &:active {
          transform: skew(30deg, 20deg) scale(0.8);
        }
      }
    }
  }
</style>
