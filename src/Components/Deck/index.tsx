import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { ReactElement, useState } from "react";
import { useDrag } from "react-use-gesture";

import "../../t.css";

// TODO:
// ! Two kind of card view. as they currently are and ontop of the default

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
  onClick: () => void;
};

const Deck = ({ data, onClick }: DeckProps): ReactElement => {
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
      {props.map(({ x, y, rot, scale }, i) => {
        console.log(data[i]);
        const { image, height, id, name, stats, weight } = data[i];
        return (
          <animated.div className="deck" key={i} style={{ x, y }}>
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
            >
              <div className="font-semibold underline underline-offset-4 p-4">
                {name[0].toUpperCase() + name.substring(1)}
              </div>
              <div className="leading-tight absolute bottom-0 w-full h-[20%] text-xs p-2 flex items-center justify-between">
                <ul>
                  {/* Capitalises first letter */}
                  <li>Id: {id}</li>
                  <li>Height: {height}</li>
                  <li>Weight: {weight}</li>
                </ul>
                <ul>
                  <li>Name: {name}</li>
                  <li>Height: {height}</li>
                  <li>Weight: {weight}</li>
                </ul>
              </div>
            </animated.div>
          </animated.div>
        );
      })}
      <div className="absolute bottom-96">&larr; Drag cards &rarr;</div>
      <button
        type="button"
        onClick={onClick}
        className="hover:scale-95 hover:shadow-sm transition-all absolute bottom-32 px-4 py-2 rounded-lg border-4 shadow-md shadow-amber-500 bg-white"
      >
        Randomise Pokemon
      </button>
    </>
  );
};

export default Deck;
