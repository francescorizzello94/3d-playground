import "./styles.css";
import { Canvas } from "react-three-fiber";
import Cubes from "./components/Cubes";
import Lights from "./components/Lights";
import Environment from "./components/Environment/Environment";

export const ParticleApp = () => {
  return (
    <>
      <Canvas>
        <Cubes />
        <Lights />
        <Environment />
      </Canvas>
    </>
  );
}

