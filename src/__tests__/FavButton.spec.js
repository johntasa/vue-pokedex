import { mount } from "@vue/test-utils";
import FavButton from "@/components/FavButton.vue";
import { createTestingPinia } from "@pinia/testing";
import { usePokeStore } from "@/store/pokeStore.js";
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe("FavButton.vue", () => {
  let pokeStore;

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: jest.fn,
    });
    pokeStore = usePokeStore(pinia);
  });

  it("renders the button with the correct aria-label when the pokemon is not a favorite", () => {
    const wrapper = mount(FavButton, {
      props: {
        pokemon: { name: "Pikachu" },
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.find("button").attributes("aria-label")).toBe("Add to favorites");
  });

  it("renders the correct icon when the pokemon is not a favorite", () => {
    const wrapper = mount(FavButton, {
      props: {
        pokemon: { name: "Squirtle" },
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const icon = wrapper.find("img");
    expect(icon.attributes("src")).toBe("/Disabled.svg");
    expect(icon.classes()).not.toContain("favorite-button__icon--active");
  });

  it("stops event propagation when the button is clicked", async () => {
    const stopPropagation = jest.fn();
    const wrapper = mount(FavButton, {
      props: {
        pokemon: { name: "Eevee" },
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const event = { stopPropagation };
    await wrapper.vm.setFavorite(event, { name: "Eevee" });

    expect(stopPropagation).toHaveBeenCalled();
  });
});
