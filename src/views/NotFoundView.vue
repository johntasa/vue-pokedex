<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push({ name: "Home" });
};
</script>

<template>
  <div class="error-page">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <button class="error-page__button" @click="goHome" aria-label="Go back home">
      Go back home
    </button>
    <br>
    <img src="/EverythingFine.gif" alt="Gif of Will Smith putting out a fire in a room" />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
  .error-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 100vh;
    width: 100vw;
    font-family: 'Roboto', sans-serif;

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

  img {
    width: 100%;
    max-width: 400px;
  }
</style>
