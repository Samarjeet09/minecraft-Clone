import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";

export const Player = () => {
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 2, 0],
  }));
  //   we need to store posi of our player
  const posi = useRef([0, 0, 0]);
  //   use frame runs on every frame
  useEffect(() => {
    api.position.subscribe((p) => (posi.current = p));
  }, [api.position]);
  const vel = useRef([0, 0, 0]);
  //   use frame runs on every frame
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  useFrame(() => {
    // we  need to update cam na
    camera.position.copy(
      new Vector3(posi.current[0], posi.current[1], posi.current[2])
    );
    // api.velocity.set(0,1,0)
  });
  return <mesh ref={ref}></mesh>;
};
// what have we done
/*
we have taken the camera using useThree wala hook
the we made a sphere using useSphere and
uska location use effect sei pass kiya in posi which is attached to posi 
using useRef react ka hook 
then humeo useFrame sei camera ko set kiya to the position of ref (oi.e posi of sphere)  
*/
