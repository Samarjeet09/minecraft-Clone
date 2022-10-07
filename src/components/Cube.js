import { useBox } from "@react-three/cannon";
import * as alltextures from "../images/textures";
import { useStore } from "../hooks/useStore";
import { useState } from "react";

export const Cube = ({ position, texture }) => {
  const [ref] = useBox(() => ({ type: "Static", position }));
  const activeTexture = alltextures[texture + "Texture"];
  //   console.log(activeTexture);
  const [hover, setHover] = useState(false);

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHover(false);
      }}
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
      <meshStandardMaterial
        map={activeTexture}
        attach="material"
        transparent={true}
        opacity={texture === "glass" ? 0.69 : 1}
        color={hover ? "#B0B0B0" : "white"}
      />
    </mesh>
  );
};
