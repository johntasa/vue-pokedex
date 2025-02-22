export async function getPokemons ({pokeAPI = 'https://pokeapi.co/api/v2/pokemon', pokemonName = ''}) {
  const response = await fetch(`${pokeAPI}${pokemonName}`)
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemons')
  }
  return response.json()
}
