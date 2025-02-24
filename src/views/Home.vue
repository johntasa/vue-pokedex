<script setup>
import { computed } from "vue";
import { usePokemonsStore } from "../store/pokemonsStore.js";
import { useRouter } from "vue-router"; 
import Loader from "../components/Loader.vue";

const pokemonsStore = usePokemonsStore();

const router = useRouter();
const loading = computed(() => pokemonsStore.loading);

const getPokemonsInfo = async () => {
  await pokemonsStore.getPokemons();
  router.push({ name: "Pokemons" });
}
</script>

<template>
  <div class="home" v-if="!loading">
    <div>
      <img class="home__image" src="/Pikachu_Welcome.svg" alt="Image of Pikachu greeting" loading="lazy"/>
    </div>
    <h1 class="home__title">Welcome to Pokédex</h1>
    <p class="home__description">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokéhmon world.</p>
    <button class="home__button" @click="getPokemonsInfo" type="button" aria-label="Get started">Get started</button>
  </div>
  <Loader v-else />  
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  height: 100vh;
  max-width: 580px;
  font-family: 'Roboto', sans-serif;

  &__image {
    width: 100%;
    max-width: 325px;
    height: auto;
    border: #333333 solid 2px;
    background-color: #F22539;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    font-weight: 700;
    font-size: 26px;
    color: #353535;
    text-align: center;
  }

  &__description {
    font-weight: 500;
    font-size: 18px;
    line-height: 1.5;
    text-align: center;
    color: #5E5E5E;
  }

  &__button {
    width: auto;
    min-width: 131px;
    padding: 0.75rem 1.5rem;
    border-radius: 60px;
    border: none;
    background-color: #F22539;
    color: #FFFFFF;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    &:hover {
      background-color: #C00E20;
    }
  }
}

@media (max-width: 768px) {
  .home {
    width: 95%;
  }
}
</style>
