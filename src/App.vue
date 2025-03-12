<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
* {
  box-sizing: border-box;
}

body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Roboto', sans-serif;
}

.main {
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}
</style>
