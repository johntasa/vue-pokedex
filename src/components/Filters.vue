<script setup>

</script>

<template>
  <div class="filter">
    <button class="filter__all" @click="$emit('filter-all')">
      <img src="/Burger.svg" alt="Burger icon"> All
    </button>
    <button class="filter__favorites" @click="$emit('filter-favorites')">
      <img src="/Star.svg" alt="Star icon">Favorites
    </button>
  </div>
</template>

<style scoped lang="scss">
  .filter {
    background-color: #F9F9F9;
    width: 100vw;
    min-width: max-content;
    display: flex;
    justify-content: center;
    gap: 3rem;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

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
      background-color: #F22539;
      color: #FFFFFF;
      cursor: pointer;
      &:hover {
        background-color: #C00E20;
      }
    }
  }
</style>
