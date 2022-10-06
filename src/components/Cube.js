import { useBox } from "@react-three/cannon";
import * as alltextures from "../images/textures";

export const Cube = ({ position, texture }) => {
  const [ref] = useBox(() => ({ type: "Static", position }));
  const activeTexture = alltextures[texture + "Texture"];
//   console.log(activeTexture);

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial map={activeTexture} attach="material" />
    </mesh>
  );
};
