import { useEffect } from "react";
import Deck from "./Components/Deck";
import { usePokemons } from "./Services/DataApi";

const App = () => {
  useEffect(() => {
    (async () => {
      const { data, error } = await usePokemons();
      console.log(data, error);
    })();
  }, []);
  return (
    <div className="bg-red-50 h-screen w-screen grid place-items-center cursor-move">
      <Deck />
    </div>
  );
};

export default App;
