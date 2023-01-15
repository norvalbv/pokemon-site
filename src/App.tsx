import { ReactElement, useEffect, useState } from "react";
import Deck from "./Components/Deck";
import { usePokemon, usePokemons } from "./Services/DataApi";

const App = (): ReactElement => {
  const [d, setD] = useState<any | null>(null);
  const [r, setR] = useState(10);

  useEffect(() => {
    (async () => {
      const { data, error } = await usePokemons(r);

      setD(data);
    })();
  }, [r]);

  if (!d) return <></>;

  return (
    <div className="bg-red-50 h-screen w-screen grid place-items-center cursor-move">
      <Deck data={d} onClick={() => setR(Math.ceil(Math.random() * 100))} />
    </div>
  );
};

export default App;
