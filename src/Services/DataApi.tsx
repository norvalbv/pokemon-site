import axios, { AxiosError } from "axios";

/**
 * Obtain full list of pokemons
 */
export const usePokemons = async () => {
  let error: AxiosError | null = null;

  const data = await axios("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.data)
    .catch((err: AxiosError) => (error = err));

  return { data, error };
};

/**
 * Obtain full list of pokemons
 */
export const usePokemon = async () => {
  let error: AxiosError | null = null;

  const data = await axios("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.data)
    .catch((err: AxiosError) => (error = err));

  return { data, error };
};

// fetch a list of 10 random pokemons with a randomise button to display their cards.

// display full list of pokemons in list view.
