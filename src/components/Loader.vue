<template>
  <div class="loader">
    <img class="loader__pikachu" src="https://i.gifer.com/2iiJ.gif" alt="Loader Pikachu running">
    <img class="loader__pokeball" src="/Loader.svg" alt="Loader pokeball icon">
  </div>
</template>

<style scoped lang="scss">
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