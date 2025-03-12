<template>
  <div class="loader">
    <img class="loader__pikachu" src="/Pika-running.gif" alt="Loader Pikachu running">
    <img class="loader__pokeball" src="/Loader.svg" alt="Loader pokeball icon">
  </div>
</template>

<style scoped lang="scss">
.loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);

  &__pokeball {
    width: 20vmin;
    height: 20vmin;
    max-width: 150px;
    max-height: 150px;
    animation: spin 2s linear infinite;
  }

  &__pikachu {
    width: 15vmin;
    height: 12vmin;
    max-width: 100px;
    max-height: 80px;
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