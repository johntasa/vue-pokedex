<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
    required: true,
  },
  description: {
    type: String,
    default: "",
    required: true,
  },
});
</script>

<template>
  <div class="modal-confirmation">
    <h4>{{ title }}</h4>
    <br>
    <span>{{ description }}</span>
    <img src="/Pikachu_Welcome.svg" alt="Image of Pikachu greeting" loading="lazy"/>
  </div>
</template>

<style scoped lang="scss">
.modal-confirmation {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #BFBFBF;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 0.875rem;
  img {
    width: 30px;
    height: 30px;
  }
}
</style>