<script setup>
import { usePokeStore } from "@/store/pokeStore.js";
import { storeToRefs } from "pinia";

const pokeStore = usePokeStore();
const { isFilteredFavorites, favoritePokemons } = storeToRefs(pokeStore);
const toggleFilters = (filter) => pokeStore.toggleFilters(filter);
</script>

<template>
  <div class="filter">
    <button
      :class="{ 'filter__all--active': !isFilteredFavorites }"
      class="filter__all"
      @click="toggleFilters('all')"
      aria-label="Filter all pokemons"
    >
      <img src="/Burger.svg" alt="Burger icon"> All
    </button>
    <button
      :class="{
        'filter__favorites--disabled': favoritePokemons.length > 0,
        'filter__favorites--active': isFilteredFavorites,
      }"
      class="filter__favorites"
      aria-label="Filter favorite pokemons"
      :disabled="favoritePokemons.length === 0"
      @click="toggleFilters('favorites')"
    > 
      <img src="/Star.svg" alt="Star icon">Favorites
    </button>
  </div>
</template>

<style scoped lang="scss">
  .filter {
    background-color: #F9F9F9;
    width: calc(100% - 2rem);
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    z-index: 1000;

    &__all,
    &__favorites {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      width: 275px;
      height: 44px;
      border: none;
      border-radius: 60px;
      color: #FFFFFF;
      font-family: 'Roboto', sans-serif;
      font-weight: 700;
      font-size: 18px;
      cursor: pointer;
    }

    &__all {
      background-color: #BFBFBF;
      &:hover {
        background-color: #C00E20;
      }
      &--active {
        cursor: not-allowed;
        background-color: #F22539;
        &:hover {
          background-color: #F22539;
        }
      }
    }

    &__favorites {
      background-color: #BFBFBF;
      cursor: not-allowed;
      &:hover {
        background-color: #BFBFBF;
      }
      &--active {
        cursor: not-allowed !important;
        background-color: #F22539;
      }
      &--disabled {
        cursor: pointer;
        &:hover {
          background-color: #F22539;
        }
      }
    }
  }
</style>
