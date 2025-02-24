<script setup>
import FavButton from "../FavButton.vue";
import { capitalizeWord } from "@/utils/utils.js";

const props = defineProps({
  pokemon: {
    type: Object,
    default: () => {},
    required: true,
  },
});
</script>

<template>
  <li class="pokemon-item">
    <div class="pokemon-item__info">
      <p>{{ capitalizeWord(pokemon.name) }}</p>
      <FavButton :pokemon="pokemon" />
    </div>
  </li>
</template>

<style scoped lang="scss">
.pokemon-item {
  cursor: zoom-in;
  display: flex;

  &:active {
    transform: scale(0.98);
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 60px;
    background-color: #F9F9F9;
    border-radius: 5px;
    padding: 0 20px;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 22px;
    color: #353535;
  }
}
</style>
