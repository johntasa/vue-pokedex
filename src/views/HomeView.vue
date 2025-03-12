<script setup>
import { usePokeStore } from "../store/pokeStore.js";
import { useRouter } from "vue-router"; 
import PokeLoader from "@/components/PokeLoader.vue";
import { storeToRefs } from "pinia";

const pokeStore = usePokeStore();

const router = useRouter();
const { loading } = storeToRefs(pokeStore);

const getPokemonsInfo = async () => {
  await pokeStore.getPokemons();
  router.push({ name: "Pokemons" });
}
</script>

<template>
  <div class="home" v-if="!loading">
    <div>
      <img class="home__image" src="/Pikachu_Welcome.svg" alt="Image of Pikachu greeting" loading="lazy"/>
      <div class="home__image__border"></div>
    </div>
    <h1 class="home__title">Welcome to Pokédex</h1>
    <p class="home__description">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
    <button class="home__button" @click="getPokemonsInfo" type="button" aria-label="Get started">Get started</button>
  </div>
  <PokeLoader v-else />  
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
    position: relative;
    z-index: 1000;
    bottom: 7px;
  }

  &__image__border {
    width: 100%;
    max-width: 210px;
    height: 100%;
    max-height: 210px;
    border: #333333 solid 2px;
    background-color: #F22539;
    border-radius: 50%;
    position: relative;
    bottom:43%;
    left: 47%;
    transform: translate(-50%, -50%);
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
