import { ReactElement, useEffect, useState } from "react";
import Deck from "./Components/Deck";
import { usePokemon, usePokemons } from "./Services/DataApi";

const App = (): ReactElement => {
  const [d, setD] = useState<any | null>(null);
  useEffect(() => {
    (async () => {
      const { data, error } = await usePokemons({});

      setD(data.map((d) => d.image));
    })();
  }, []);

  if (!d) return <></>;

  console.log(d);

  return (
    <div className="bg-red-50 h-screen w-screen grid place-items-center cursor-move">
      <Deck images={d} />
    </div>
  );
};

export default App;
