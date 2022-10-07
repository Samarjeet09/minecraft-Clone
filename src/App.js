import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { FPV } from "./components/FPV";
import { Cubes } from "./components/Cubes";
import { TextureSelector } from "./components/TextureSelector";
import { Menu } from "./components/Menu";

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[69, 420, 69]} />
        <ambientLight intensity={0.5} />
        <FPV />
        <Physics>
          {/* this is our container which will have all the physics and all imsei ground wagera bamega  */}
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <div className="absolute centered cursor">+</div>
      <TextureSelector />
      <Menu />
      <div className="absolute helpBox">
        <p>
          w,a,s,d to move <br /> space to jump
          <br />
          1-5 for textures
          <br />
          Right Click to place a block
          <br />
          Left Click to remove a block
          <br />
          Have Fun!
        </p>
      </div>
    </>
  );
}

export default App;
