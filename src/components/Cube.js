import { useBox } from "@react-three/cannon";
import * as alltextures from "../images/textures";
import { useStore } from "../hooks/useStore";
import { useState } from "react";
import { useThree } from "@react-three/fiber";

export const Cube = ({ position, texture }) => {
  const { camera } = useThree();
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
        const distance = camera.position.distanceTo(ref.current.position);
        // console.log(distance);
        // console.log(e.nativeEvent.button);
        e.stopPropagation();
        // we want jis face pei click ho uskei adjeacent ek aaye
        const clickedFace = Math.floor(e.faceIndex / 2); //har face pei 2 triangles hotei hai so yeah easy fix
        const { x, y, z } = ref.current.position;
        if (e.nativeEvent.button === 2 && distance <= 5) {
          removeCube(x, y, z);
          return;
        } else if (
          clickedFace === 0 &&
          distance >= 1.6 &&
          distance <= 20 &&
          e.nativeEvent.button === 0
        ) {
          addCube(x + 1, y, z);
          return;
        } else if (
          clickedFace === 1 &&
          distance >= 1.6 &&
          distance <= 20 &&
          e.nativeEvent.button === 0
        ) {
          addCube(x - 1, y, z);
          return;
        } else if (
          clickedFace === 2 &&
          distance >= 1.6 &&
          distance <= 20 &&
          e.nativeEvent.button === 0
        ) {
          addCube(x, y + 1, z);
          return;
        } else if (
          clickedFace === 3 &&
          distance >= 1.6 &&
          distance <= 20 &&
          e.nativeEvent.button === 0
        ) {
          addCube(x, y - 1, z);
          return;
        } else if (
          clickedFace === 4 &&
          distance >= 1.6 &&
          distance <= 20 &&
          e.nativeEvent.button === 0
        ) {
          addCube(x, y, z + 1);
          return;
        } else if (
          clickedFace === 5 &&
          distance >= 1.6 &&
          distance <= 20 &&
          e.nativeEvent.button === 0
        ) {
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
