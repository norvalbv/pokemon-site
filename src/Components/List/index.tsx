type ListProps = {
  data: any;
};

const List = ({ data }: ListProps) => {
  return data.map(
    ({
      image,
      height,
      id,
      name,
      stats,
      baseExperience,
      weight,
      forms,
      species,
    }) => {
      return (
        <div className="h-36 border p-8 rounded-lg flex items-center justify-between mb-4 bg-fuchsia-200/40">
          <div className="flex items-center gap-10">
            <img src={image} alt={`${name} image`} className="h-[150px]" />
            <h2 className="underline text-2xl -rotate-45 text-center font-Courgette capitalize text-green-800">
              {name} <br /> <span className="text-base">{id}</span>
            </h2>
          </div>
          <div className="flex items-center font-serif italic">
            <div className="flex items-center justify-center w-60">
              <span className="-rotate-90 relative inline-block -mr-6 underline underline-offset-4">
                Pokemon Data:
              </span>
              <ul>
                <li>Weight: {weight}</li>
                <li>Height: {height}</li>
                <li>Experience: {baseExperience}</li>
              </ul>
            </div>
            <div className="flex items-center justify-center w-60">
              <span className="-rotate-90 relative inline-block -mr-2 underline underline-offset-4">
                Stat Data:
              </span>
              <ul>
                <li>Weight: {weight}</li>
                <li>Height: {height}</li>
                <li>Experience: {baseExperience}</li>
              </ul>
            </div>
            <div className="flex items-center justify-center w-60">
              <span className="-rotate-90 relative inline-block -mr-6 underline underline-offset-4">
                Pokemon Data:
              </span>
              <ul>
                <li>Weight: {weight}</li>
                <li>Height: {height}</li>
                <li>Experience: {baseExperience}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  );
};

export default List;
