import { useBox } from "@react-three/cannon";
import * as alltextures from "../images/textures";
import { useStore } from "../hooks/useStore";

export const Cube = ({ position, texture }) => {
  const [ref] = useBox(() => ({ type: "Static", position }));
  const activeTexture = alltextures[texture + "Texture"];
  //   console.log(activeTexture);

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  return (
    <mesh
      onClick={(e) => {
        // console.log(e.nativeEvent.button);
        e.stopPropagation();
        // we want jis face pei click ho uskei adjeacent ek aaye
        const clickedFace = Math.floor(e.faceIndex / 2); //har face pei 2 triangles hotei hai so yeah easy fix
        const { x, y, z } = ref.current.position;
        if (e.nativeEvent.button === 2) {
          removeCube(x, y, z);
          return;
        } else if (clickedFace === 0) {
          addCube(x + 1, y, z);
          return;
        } else if (clickedFace === 1) {
          addCube(x - 1, y, z);
          return;
        } else if (clickedFace === 2) {
          addCube(x, y + 1, z);
          return;
        } else if (clickedFace === 3) {
          addCube(x, y - 1, z);
          return;
        } else if (clickedFace === 4) {
          addCube(x, y, z + 1);
          return;
        } else if (clickedFace === 5) {
          addCube(x, y, z - 1);
          return;
        }
      }}
      ref={ref}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial map={activeTexture} attach="material" />
    </mesh>
  );
};
