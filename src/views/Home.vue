<script setup>
import { computed } from "vue";
import { usePokemonsStore } from "../store/pokemonsStore.js";
import { useRouter } from "vue-router"; 

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
    <p class="home__description">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
    <button class="home__button" @click="getPokemonsInfo" type="button">Get started</button>
  </div>
  <div class="loader" v-else>
    <img class="loader__pikachu" src="https://i.gifer.com/2iiJ.gif" alt="Loader Pikachu running">
    <img class="loader__pokeball" src="/Loader.svg" alt="Loader pokeball icon">
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 75vh;
  /* > div {
    border: #333333 solid 2px;
    background-color: #F22539;
    border-radius: 50%;
    width: 264px;
    height: 264px;
    display: flex;
    justify-content: center;
    align-items: center;
  } */

  &__image {
    width: 325px;
    height: 288px;
    border: #333333 solid 2px;
    background-color: #F22539;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    font-family: Lato;
    font-weight: 700;
    font-size: 26px;
    color: #353535;
  }

  &__description {
    font-family: Lato;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: 0%;
    text-align: center;
    color: #5E5E5E;
  }

  &__button {
    width: 131px;
    height: 44px;
    border-radius: 60px;
    border: none;
    padding: 11px 20px;
    background-color: #F22539;
    color: #FFFFFF;
    cursor: pointer;
    &:hover {
      background-color: #C00E20;
    }
  }
}

.loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__pokeball {
    width: 150px;
    height: 150px;
    animation: spin 2s linear infinite;
  }
  &__pikachu {
    width: 100px;
    height: 80px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
