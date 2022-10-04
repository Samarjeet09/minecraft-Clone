import { dirtImg, grassImg, glassImg, logImg, woodImg } from "./images";
import { TextureLoader } from "three";
// aim to create textures form the images

const dirtTexture = new TextureLoader().load(dirtImg);
const grassTexture = new TextureLoader().load(grassImg);
const glassTexture = new TextureLoader().load(glassImg);
const logTexture = new TextureLoader().load(logImg);
const woodTexture = new TextureLoader().load(woodImg);
const groundTexture = new TextureLoader().load(grassImg);

export {
  dirtTexture,
  grassTexture,
  glassTexture,
  logTexture,
  woodTexture,
  groundTexture,
};
