import create from "zustand";
import { nanoid } from "nanoid";

// helper func to talk to local storage
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
export const useStore = create((set) => ({
  // set is obj passed and we return a obj
  texture: "dirt",
  cubes: JSON.parse(window.localStorage.getItem("cubes")) || [],
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
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({ texture }));
  },
  saveWorld: () => {
    set((prev) => {
      console.log("hello");
      localStorage.setItem("cubes", JSON.stringify(prev.cubes));
      debugger;
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
