import React from "react";
import { usePlane } from "@react-three/cannon";
import { useStore } from "../hooks/useStore";

// yeh usePlane is a hook
import { groundTexture } from "../images/textures";
export const Ground = () => {
  // this plane will give us an array
  // jismei we place a reference on the mesh that we let cannon control
  const [ref] = usePlane(() => ({
    // use plane used a call back funtion which returns this obj
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));
  const [addCube] = useStore((state) => [state.addCube]);

  groundTexture.repeat.set(100, 100);
  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        if (e.nativeEvent.button === 0) {
          const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
          // console.log(x, y, z);
          addCube(x, y, z);
        }
        // debugger;
      }}
      ref={ref}
    >
      {/* now we will have a geometry  */}
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
