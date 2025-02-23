export async function getPokemons(pokemonName = "") {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon${pokemonName}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémons");
  }
  return response.json();
}
