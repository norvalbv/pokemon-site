import { ReactElement, useEffect, useState } from "react";
import Deck from "./Components/Deck";
import List from "./Components/List";
import Spinner from "./Components/Spinner";
import { usePokemons } from "./Services/DataApi";

const App = (): ReactElement => {
  const [d, setD] = useState<any | null>(null);
  const [pokemonFetchers, setPokemonFetchers] = useState({
    randomise: 10,
    stackCount: {
      min: 5,
      max: 25,
      current: 10,
    },
  });
  const [loading, setLoading] = useState(false);

  const min =
    pokemonFetchers.stackCount.current <= pokemonFetchers.stackCount.min;
  const processedMin = pokemonFetchers.stackCount.min;
  const max =
    pokemonFetchers.stackCount.current >= pokemonFetchers.stackCount.max;
  const processedMax = pokemonFetchers.stackCount.max;

  const [type, setType] = useState<"cards" | "list">("cards");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await usePokemons(pokemonFetchers);

      setD(data);
      setLoading(false);
    })();
  }, [pokemonFetchers]);

  return (
    <div className="bg-gradient-to-br from-red-100 via-green-50 to-blue-100 min-h-screen relative">
      <div className="relative text-center p-10 w-full">
        <h1 className="font-Courgette text-green-900 text-4xl underline underline-offset-4">
          PokeCards
        </h1>
        <button
          type="button"
          className="hover:scale-95 hover:shadow-sm transition-all mt-10 px-4 py-2 rounded-lg border-4 bg-white"
          onClick={() => setType(type === "cards" ? "list" : "cards")}
        >
          View Pokemon {type === "cards" ? "List" : "cards"}
        </button>
      </div>
      {loading || !d ? (
        <div className="grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {type === "cards" ? (
            <div className="h-full w-full grid place-items-center font-serif mt-60">
              <Deck data={d} />
            </div>
          ) : (
            <div className="mx-10 pb-32">
              <List data={d} />
            </div>
          )}
        </>
      )}
      <div className="w-full flex items-center justify-center gap-10 absolute bottom-10">
        <button
          type="button"
          onClick={() =>
            setPokemonFetchers((prev) => ({
              ...prev,
              randomise: Math.ceil(Math.random() * 100),
            }))
          }
          className="font-Courgette hover:scale-95 hover:shadow-sm transition-all px-4 py-2 rounded-lg border-4 shadow-md shadow-amber-500 bg-white"
        >
          Randomise Pokemon
        </button>
        <div className="flex flex-col items-bottom justify-center relative">
          <span className="absolute -top-6 italic underline text-sm uppercase">
            Stack Count: {pokemonFetchers.stackCount.current}
          </span>
          <div>
            <button
              type="button"
              onClick={() => {
                if (max) return;
                setPokemonFetchers((prev) => ({
                  ...prev,
                  stackCount: {
                    min: processedMin,
                    max: processedMax,
                    current: pokemonFetchers.stackCount.current + 5,
                  },
                }));
              }}
              className={`${
                !max ? "hover:shadow-sm hover:scale-95" : "cursor-default"
              } w-16 font-Courgette transition-all px-4 py-2 rounded-lg border-4 shadow-md shadow-amber-500 bg-white`}
            >
              {max ? "MAX" : "+ 5"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (min) return;
                setPokemonFetchers((prev) => ({
                  ...prev,
                  stackCount: {
                    min: processedMin,
                    max: processedMax,
                    current: pokemonFetchers.stackCount.current - 5,
                  },
                }));
              }}
              className={`${
                !min ? "hover:scale-95 hover:shadow-sm" : "cursor-default"
              } w-16 font-Courgette transition-all px-4 py-2 rounded-lg border-4 shadow-md shadow-amber-500 bg-white`}
            >
              {min ? "MIN" : "- 5"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
