import { ReactElement, useEffect, useState } from "react";
import Deck from "./Components/Deck";
import List from "./Components/List";
import { usePokemon, usePokemons } from "./Services/DataApi";

const App = (): ReactElement => {
  const [d, setD] = useState<any | null>(null);
  const [r, setR] = useState(10);

  const [type, setType] = useState<"cards" | "list">("cards");

  useEffect(() => {
    (async () => {
      const { data, error } = await usePokemons(r);

      setD(data);
    })();
  }, [r]);

  if (!d) return <></>;

  return (
    <div className="bg-gradient-to-br from-red-100 via-green-50 to-blue-100 h-screen w-screen">
      <div className="absolute text-center p-10 right-0 left-0">
        <h1 className="font-Courgette text-green-900 text-4xl underline underline-offset-4">
          PokeCards
        </h1>
        <button
          type="button"
          className="hover:scale-95 hover:shadow-sm transition-all mt-10 px-4 py-2 rounded-lg border-4 bg-white"
          onClick={() => setType(type === "cards" ? "list" : "cards")}
        >
          View {type === "cards" ? "list" : "cards"}
        </button>
      </div>

      {type === "cards" ? (
        <div className="h-full w-full grid place-items-center cursor-move font-serif">
          <Deck data={d} onClick={() => setR(Math.ceil(Math.random() * 100))} />
        </div>
      ) : (
        <div className="min-h-full w-full relative top-60 mx-10">
          <List data={d} />
        </div>
      )}
    </div>
  );
};

export default App;
