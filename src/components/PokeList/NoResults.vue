<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push({ name: "Home" });
};
</script>

<template>
  <div class="error-page">
    <h1 class="error-page__title">Uh-oh!</h1>
    <p class="error-page__message">You look lost on your journey!</p>
    <button class="error-page__button" @click="goHome" aria-label="Go back home">
      Go back home
    </button>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  height: 100vh;
  width: 100vw;
  font-family: 'Roboto', sans-serif;

  &__title {
    font-size: 36px;
    color: #353535;
    margin: 0;
  }

  &__message {
    font-size: 20px;
    color: #5E5E5E;
    margin: 0;
  }

  &__button {
    padding: 0.75rem 1.5rem;
    background-color: #F22539;
    color: #F9F9F9;
    border: none;
    border-radius: 60px;
    font-size: 18px;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #C00E20;
    }
  }
}
</style>