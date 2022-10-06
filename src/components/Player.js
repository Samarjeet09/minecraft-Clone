import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

//////////constant for jumpin///////////////////////////////
const JUMP_FORCE = 5;
//////////constant for Moving///////////////////////////////
const SPEED = 5;

export const Player = () => {
  const actions = useKeyboard();
  // console.log(Object.entries(actions).filter(([k, v]) => v));

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
    // {we will be able to turn and stuff so we ll need vector for curr dirn forward back left rigth speed as well}
    const direction = new Vector3();
    const frontVector = new Vector3(
      (actions.moveRight ? 1 : 0) - (actions.moveLeft ? 1 : 0),
      0,
      0
    );
    const sideVector = new Vector3(
      0,
      0,
      (actions.moveForward ? 1 : 0) - (actions.moveBackward ? 1 : 0)
    );
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, vel.current[1], direction.z);
    if (actions.jump && Math.abs(vel.current[1]) < 0.0069) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
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
