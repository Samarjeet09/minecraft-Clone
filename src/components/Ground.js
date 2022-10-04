import React from "react";
import { usePlane } from "@react-three/cannon";
// yeh usePlane is a hook
import { groundTexture } from "../images/textures";
import { NearestFilter, RepeatWrapping } from "three";
export const Ground = () => {
  // this plane will give us an array
  // jismei we place a reference on the mesh that we let cannon control
  const [ref] = usePlane(() => ({
    // use plane used a call back funtion which returns this obj
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));
  groundTexture.magFilter = NearestFilter;
  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);
  return (
    <mesh ref={ref}>
      {/* now we will have a geometry  */}
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
