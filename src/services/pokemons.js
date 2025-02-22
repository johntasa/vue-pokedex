export async function getPokemons(url = "https://pokeapi.co/api/v2/pokemon") {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémons");
  }
  return response.json();
}
