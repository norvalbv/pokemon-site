import axios, { AxiosError } from "axios";

type Pokemon<T> = {
  image: string;
  name: string;
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  weight: number;
  height: number;
  id: number;
  baseExperience: number;
  forms: { [key: string]: string | Array<T> | number };
  species: { [key: string]: string | Array<T> | number };
  data: T;
};

/**
 * Obtain full list of pokemons
 */
export const usePokemons = async (randomise: number, stackCount = 10) => {
  let error: AxiosError | null = null;
  let data: Pokemon = [];

  for (let i = randomise; i <= randomise + stackCount; i++) {
    data.push(
      await axios(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(async (response) => {
          const { data } = response;
          return {
            image: data.sprites.front_default,
            name: data.name,
            stats: data.stats,
            weight: data.weight,
            height: data.height,
            id: data.id,
            baseExperience: data.base_experience,
            forms: await axios(data.forms[0].url)
              .then((res) => res.data)
              .catch((err) => console.error(err)),
            species: await axios(data.species.url)
              .then((res) => res.data)
              .catch((err) => console.error(err)),
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
