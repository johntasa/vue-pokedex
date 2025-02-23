<script setup>
import { defineProps, computed, ref } from 'vue';
import { capitalizeWord } from '../utils/utils';

const props = defineProps({
  pokeDetails: {
    type: Object,
    default: () => {},
    required: true,
  },
  selectedPokemons: {
    type: Object,
    default: () => {},
    required: true,
  },
});

const textToCopy = ref('');

const types = computed(() => {
  return props.pokeDetails.types.map(t => capitalizeWord(t.type.name));
});

const copyToClipboardInfo = async () => {
  textToCopy.value =
    `Name: ${capitalizeWord(props.pokeDetails.name)}, Height: ${props.pokeDetails.height}, Weight: ${props.pokeDetails.weight}, Types: ${types.value.join(', ')}`;
  try {
    await navigator.clipboard.writeText(textToCopy.value);
    alert(`Copied to clipboard!\n${textToCopy.value}`);
  } catch (error) {
    console.error("Error copying to clipboard:", error);
  }
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-content__image-container">
        <img class="background" src="/Background.png" alt="Image of background" loading="lazy"/>
        <img class="pokemon" :src=pokeDetails.image alt="Image of pokemon" loading="lazy"/>
        <button class="modal-content__button--close" @click="$emit('close')">
          <img src="/Close.svg" alt="Close button" loading="lazy"/>
        </button>
      </div>
      <div class="modal-content__info">
        <p><strong>Name:</strong> {{ capitalizeWord(pokeDetails.name) }}</p>
        <p><strong>Height:</strong> {{ pokeDetails.height }}</p>
        <p><strong>Weight:</strong> {{ pokeDetails.weight }}</p>
        <p><strong>Types:</strong> {{ types.join(', ') }}</p>
      </div>
      <div class="modal-content__actions">
        <button class="modal-content__actions--share" @click="copyToClipboardInfo" type="button">Share to my friends</button>
        <button
          class="modal-content__actions--favorite-button"
          @click="$emit('set-favorite', $event, pokeDetails.name)"
        >
          <img
            :class="{ 'favorite-button__icon--active': selectedPokemons[pokeDetails.name] }"
            class="favorite-button__icon"
            :src="selectedPokemons[pokeDetails.name] ? '/Active.svg' : '/Disabled.svg'"
            alt="Icon of a star"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    &-content {
      width: 570px;
      background-color: #F9F9F9;
      border-radius: 5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

      &__image-container {
        position: relative;
        .background {
          width: 100%;
          height: 220px;
          display: block;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        .pokemon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180px;
          height: auto;
        }
      }

      &__button--close {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
      }

      &__info {
        padding: 20px 30px 0 30px;
        p {
          border-bottom: 1px solid #ccc;
          padding-bottom: 1rem;
        }
      }

      &__actions {
        display: flex;
        justify-content: space-between;
        padding: 0 30px 20px 30px;
        &--share {
          height: 44px;
          background-color: #f22539;
          color: white;
          border-radius: 60px;
          border: none;
          padding: 11px 20px;
          cursor: pointer;
        }

        &--favorite-button {
          background-color: transparent;
          border: none;
          .favorite-button__icon {
            cursor: pointer;
            &:active {
              transform: rotate(0.5turn);
            }

            &--active {
              &:active {
                transform: skew(30deg, 20deg) scale(0.8);
              }
            }
          }
        }
      }
    }
  }
</style>
