import create from "zustand";
import { nanoid } from "nanoid";

export const useStore = create((set) => ({
  // set is obj passed and we return a obj
  texture: "dirt",
  cubes: [
    { key: nanoid(), pos: [1, 0.5, 3], texture: "dirt" },
    { key: nanoid(), pos: [1, 0.5, 2], texture: "log" },
  ],
  //   now methods that will interact with state
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: () => {},
  setTexture: () => {},
  saveWorld: () => {},
  resetWorld: () => {},
}));
