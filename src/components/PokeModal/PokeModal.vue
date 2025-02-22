<script setup>
import { computed, ref } from 'vue';
import { capitalizeWord, copyToClipboard } from '@/utils/utils.js';
import FavButton from '@/components/FavButton.vue';
import SharedModal from './SharedModal.vue';

const props = defineProps({
  pokeDetails: {
    type: Object,
    default: () => {},
    required: true,
  },
});

const textToCopy = ref('');
const copied = ref(false);

const types = computed(() => {
  return props.pokeDetails.types.map(t => capitalizeWord(t.type.name));
});

const copyToClipboardInfo = async () => {
  textToCopy.value = `Name: ${capitalizeWord(props.pokeDetails.name)}, Height: ${props.pokeDetails.height}, Weight: ${props.pokeDetails.weight}, Types: ${types.value.join(', ')}`;
  try {
    await copyToClipboard(textToCopy.value);
    copied.value = true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);
  } finally {
    setTimeout(() => {
      copied.value = false;
      textToCopy.value = '';
    }, 2000);
  }
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-content__image-container">
        <img class="background" src="/Background.png" alt="Image of background" loading="lazy"/>
        <img class="pokemon" :src="pokeDetails.image" alt="Image of pokemon" loading="lazy"/>
        <button class="modal-content__button--close" @click="$emit('close-modal')" aria-label="Close modal">
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
        <button class="modal-content__actions--share" @click="copyToClipboardInfo" type="button" aria-label="Share Pokemon info">
          Share to my friends
        </button>
        <FavButton :pokemon="pokeDetails" />
      </div>
    </div>
    <SharedModal v-if="copied" title="Copied to clipboard!" :description="textToCopy"/>
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
    width: 90%;
    max-width: 570px;
    background-color: #F9F9F9;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: hidden;

    &__image-container {
      position: relative;
      .background {
        width: 100%;
        height: auto;
        min-height: 220px;
        display: block;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      .pokemon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        max-width: 180px;
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

      img {
        width: 24px;
        height: 24px;
      }
    }

    &__info {
      padding: 0 30px;
      font-family: 'Roboto', sans-serif;
      font-size: 18px;

      p {
        border-bottom: 1px solid #E8E8E8;
        padding: 1rem 0;
        margin: 0;
        color: #5E5E5E;
      }
    }

    &__actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px 20px 30px;
      
      &--share {
        height: 44px;
        background-color: #F22539;
        color: #F9F9F9;
        border-radius: 60px;
        border: none;
        padding: 0 20px;
        cursor: pointer;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        font-weight: 700;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #C00E20;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;

    &__image-container {
      .pokemon {
        width: 50%;
      }
    }
  }
}

@media (max-width: 480px) {
  .modal-content {
    width: 85%;
    &__image-container {
      .pokemon {
        width: 60%;
      }
    }
  }
}
</style>