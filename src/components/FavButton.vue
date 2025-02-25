<script setup>
import { usePokeStore } from "@/store/pokeStore.js";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const pokeStore = usePokeStore();
const { favoritePokemons } = storeToRefs(pokeStore);

const props = defineProps({
  pokemon: {
    type: Object,
    default: () => {},
    required: true,
  },
});

const isFavorite = computed(() => favoritePokemons.value.find((fav) => fav.name === props.pokemon.name));

const setFavorite = (event, pokemon) => {
  event.stopPropagation();
  pokeStore.setFavoritePokemon(pokemon);
};
</script>

<template>
  <button
    class="favorite-button"
    @click="setFavorite($event, pokemon)"
    type="button"
    :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
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
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }

  &__icon {
    transition: transform 0.3s ease, filter 0.3s ease;

    &:hover {
      filter: brightness(1.2);
    }
    &:active {
      transform: rotate(0.5turn);
    }

    &--active {
      &:active {
        transform: skew(15deg, 15deg) scale(0.9);
      }
    }
  }
}
</style>
