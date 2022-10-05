import { useCallback, useEffect, useState } from "react";

function actionMapper(key) {
  const keyActionMap = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };
  return keyActionMap[key];
}

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    texture1: false,
    texture2: false,
    texture3: false,
    texture4: false,
    texture5: false,
  });

  const handleKeyDown = useCallback((e) => {
    const action = actionMapper(e.code);
    if (action) {
      // got the key we were listening for
      // now we can set the movement and preserve prev state
      setActions((prev) => {
        return {
          ...prev,
          //   pehele we preserved then we setted it to new
          [action]: true,
        };
      });
    }
  }, []);
  const handleKeyUp = useCallback((e) => {
    const action = actionMapper(e.code);
    if (action) {
      // got the key we were listening for
      // now we can set the movement and preserve prev state
      setActions((prev) => {
        return {
          ...prev,
          //   pehele we preserved then we setted it to new
          [action]: false,
        };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};
