import axios, { AxiosError } from "axios";

/**
 * Obtain full list of pokemons
 */
export const usePokemons = async (randomise: number) => {
  let error: AxiosError | null = null;
  let data = [];

  for (let i = randomise; i <= randomise + 10; i++) {
    data.push(
      await axios(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => {
          const { data } = response;
          return {
            image: data.sprites.front_default,
            name: data.name,
            stats: data.stats,
            weight: data.weight,
            height: data.height,
            id: data.id,
            data,
          };
        })
        .catch((err: AxiosError) => (error = err))
    );
  }

  return { data, error };
};

/**
 * Obtain individual pokemon
 */
export const usePokemon = async () => {
  let error: AxiosError | null = null;

  const data = await axios("https://pokeapi.co/api/v2/pokemon/1/")
    .then((response) => response.data)
    .catch((err: AxiosError) => (error = err));

  return { data, error };
};

// fetch a list of 10 random pokemons with a randomise button to display their cards.
// display full list of pokemons in list view.
