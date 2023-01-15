import axios, { AxiosError } from "axios";

type usePokemonsProps = {
  randomise: number;
  stackCount: { min: number; max: number; current: number };
};

/**
 * Obtain full list of pokemons
 */
export const usePokemons = async ({
  randomise,
  stackCount,
}: usePokemonsProps) => {
  let error: AxiosError | null = null;
  let data = [];

  for (let i = randomise; i < randomise + stackCount.current; i++) {
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
