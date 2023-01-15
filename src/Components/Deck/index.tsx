import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { ReactElement, useState } from "react";
import { useDrag } from "react-use-gesture";
import { capitalizeFirstLetter } from "../../utils/CapitliseFirstLetter";

import "../../t.css";

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

type DeckProps = {
  data: any;
};

const Deck = ({ data }: DeckProps): ReactElement => {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(i),
  }));
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === data.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
    }
  );
  return (
    <>
      <div className="relative grid place-items-center">
        {props.map(({ x, y, rot, scale }, i) => {
          const {
            image,
            height,
            name,
            baseExperience,
            weight,
            forms,
            species,
          } = data[i];
          return (
            <animated.div
              className="deck touch-none absolute flex items-center justify-center cursor-move"
              key={i}
              style={{ x, y }}
            >
              <animated.div
                {...bind(i)}
                style={{
                  transform: interpolate([rot, scale], trans),
                  background: "#eb01a5",
                  backgroundImage: `url(${image}), linear-gradient(to bottom right, #FEF08A, #B4FED8, #D8B4FE, #FCA5A5)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
                className="border-stone-700 border-2 w-[45vh] max-w-[200px] h-[85vh] will-change-transform max-h-[335px] rounded-lg"
              >
                <div className="font-semibold underline underline-offset-4 p-4 font-Courgette">
                  {capitalizeFirstLetter(name)}
                </div>
                <div className="border-t border-dashed border-stone-700 leading-tight absolute bottom-0 w-full h-[20%] text-[11px] p-2 flex items-center justify-between">
                  <ul>
                    <li>Height: {height}</li>
                    <li>Weight: {weight}</li>
                    <li>Experience: {baseExperience}</li>
                  </ul>
                  <ul>
                    <li>Happiness: {species.base_happiness}</li>
                    <li>
                      Mythical:{" "}
                      {capitalizeFirstLetter(species.is_mythical.toString())}
                    </li>
                    <li>
                      Is Warrior:{" "}
                      {capitalizeFirstLetter(forms.is_battle_only.toString())}
                    </li>
                  </ul>
                </div>
              </animated.div>
            </animated.div>
          );
        })}
      </div>
      <div className="absolute bottom-40">
        <span>&larr; Drag cards &rarr;</span>
      </div>
    </>
  );
};

export default Deck;
